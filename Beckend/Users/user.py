import json
from flask import Blueprint,request,jsonify
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity,jwt_required,JWTManager,unset_jwt_cookies
from datetime import timedelta,timezone,datetime
import pymongo
import uuid
import hashlib
from bson.objectid import ObjectId
from bson import json_util
import os
from utils.util import checkIsStarted
import re


user = Blueprint('user',__name__)


DB_URL = "mongodb://localhost:27017/"
DB_URL1 = os.getenv('DB_URL')
client = pymongo.MongoClient(DB_URL)
db = client.myDb
users_collection = db.users
league_collection=db.league
teams_collection=db.teams


##register
@user.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    

    # Simple user registration logic (no database involved for simplicity)
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    users = users_collection.find()
    if len(username) < 5:
        return jsonify({"error": "Username must be at least 5 characters long"}), 400

    # Check if username contains at least one uppercase letter
    if not re.search(r'[A-Z]', username):
        return jsonify({"error": "Username must contain at least one uppercase letter"}), 400
    if len(password) <= 4:
        return jsonify({"error": "Password must be more than 4 characters long"}), 400

    # Password validation: check for at least one uppercase letter
    if not re.search(r'[A-Z]', password):
        return jsonify({"error": "Password must contain at least one uppercase letter"}), 400
    # Password validation: check for at least one uppercase letter
    if not re.search(r'[a-z]', password):
        return jsonify({"error": "Password must contain at least one lowercase letter"}), 400

    # Password validation: check for at least one number
    if not re.search(r'[0-9]', password):
        return jsonify({"error": "Password must contain at least one number"}), 400
    
    # Check if user already exists
    if users_collection.find_one({"username":username}) or users_collection.find_one({"email":email}):
        return jsonify({"error": "User already exists"}), 400
    

    # Add new user
    newUser = {
        "username":username,
        "pwd":generate_password_hash(password),
        "email":email,
    }
    users_collection.insert_one(newUser);
    response = jsonify("User registered successfully")
    response.status_code = 200

    return response

@user.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    user = users_collection.find_one({'username':username})
    if not user:
        return jsonify({"error": "User Not exists"}), 400

    elif not check_password_hash(user['pwd'],password):
        return jsonify({"error": "Incorrect Password"}), 400

    token = create_access_token(identity=username)
    return jsonify({'access_token':token,'username':username}),200



@user.route('/logout',methods=['POST'])
def logout():
    response = jsonify({'msg':'logout succsuful'})
    unset_jwt_cookies(response)
    return response

@user.route('/addTeam',methods=['POST'])
def addTeam():
    data = request.json
    league_code = data.get('league_code')
    amount = data.get('amount')
    players = data.get('players')
    username = data.get('username')
    newTeam = {
        "league_code":league_code,
        "players":players,
        "username":username,
        "points" : 0,
        "amount":amount
    }
    id = teams_collection.insert_one(newTeam);
    print(id.inserted_id)
    return jsonify({"message": "Team created successfully",'id':str(id.inserted_id)}), 200


@user.route('/updateTeam',methods=['POST'])
def updateTeam():
    data = request.json
    amount = data.get('amount')
    league_code = data.get('league_code')
    players = data.get('players')
    team_id= data.get('team_id')
    query = {"_id": ObjectId(team_id) }

    update = {"$set": {"players":players,"amount":amount}}  # Change this to your update

    result = teams_collection.find_one_and_update(
    query, 
    update, 
    return_document=True)
    if result:
        print("Updated document:", result)    
        return jsonify({"message": "Team Updated successfully"}), 200

    else:
        print("No document found matching the query")
        return jsonify({"error": "Team Not Found"}), 400


@user.route('/getTeamPlayers',methods=['POST'])
def getPlayers():
    data = request.json
    username = data.get('username')
    result = []
    data = (getLeagues().data).decode('utf-8')  

    leagues = json.loads(json.loads(data)['leagues'])
    if not leagues:
        return jsonify({"error": "Team Not Found"}), 400

    for league in leagues:
        team = teams_collection.find_one({'league_code':league['league_code'],'username':username})

        players= team['players'] if team else None
        team_id = str(team['_id']) if team else None

        obj = {'team_id':str(team_id),"league_id":league['league_id'],'league_code':league['league_code'],'players':players,'league_name':league['league_name']}
        
        result.append(obj)

    return result

@user.route('/getLeagueDates',methods=['POST'])
def getDates():
    data = request.json
    leagueId = data.get('leagueId')
    id = str(leagueId)
    isStarted ,date = checkIsStarted(id)
    return jsonify({"date": date,'isStarted':isStarted}), 200

@user.route('/getUserLeagues',methods=['POST'])
def getLeagues():
    data = request.json
    username = data.get('username')
    query = {'participants': {'$in': [username]}}
    result = league_collection.find(query)
    lst = list(result)
    print("---------------------------------")
    print(username)
    print("---------------------------------")
    for i,league in enumerate(lst):
        code = league['league_code']
        participants = []
        for user in league['participants']:
            team = teams_collection.find_one({'league_code':code,'username':user})
            if team:
                amount = '30M'
                if 'amount' in team:
                    amount = team['amount']
                userInfo = {'user':user,'points':team['points'] ,'amount':amount}
            else:
                print(user,code)
                userInfo = {'user':user,'points':0 }
            participants.append(userInfo)
        league['participants']= participants
        print(league)
    if not lst:
        return jsonify({"error": "There is no leagues for this user"}), 400
    
    response = json_util.dumps(league_collection.find(query))

    return jsonify({'leagues':json_util.dumps(lst),'username':username})


@user.route('/joinLeague', methods=['POST'])
def joinLeague():
    data = request.json
    username = data.get('username')
    key = data.get('key')
    input = data.get('input')
    try:
        if key == 'league_code':
            league = league_collection.find_one({"league_code":int(input)})
        else:
            league = league_collection.find_one({"league_name":input})
        league_code = league['league_code']
    except:
        print("Error - League Not Found")
        return jsonify({"error": "League Not Found"}), 400
    
    #add the user to the league
    participants = league['participants']
    if username in participants:
        return jsonify({"error": "You are already in this league"}), 400

    query = {'league_code': league_code}
    participants.append(username)
    update = {"$set": {"participants":participants}}  # Change this to your update
    result = league_collection.find_one_and_update(
    query, 
    update, 
    return_document=True)

    obj = {"league_id":result['league_id'],'league_code':result['league_code'],'league_name':league['league_name']}

    return jsonify(obj), 200


@user.route('/createLeague', methods=['POST'])
def create_league():
    data = request.json
    league_id = data.get('leagueId')
    league_name = data.get('leagueName')
    username = data.get('username')
    id = create_unique_id_from_string(league_name)
    # Process the data as needed, e.g., save it to a database
    print(f"Received data: League ID: {league_id}, League Name: {league_name}, Username: {username},id:{id}")
    leagueName = league_collection.find()
    # Return a response
    if league_collection.find_one({"league_name":league_name}):
        return jsonify({"error": "league name already exists"}), 400
    if  league_id == ""  or league_name=="" or league_name==" " :
        return jsonify({"error": "Please fill in both fields."}), 400
    newLeague = {
        "league_name":league_name,
        "league_id":league_id,
        'username':username,
        'league_code':id,
        'participants':[username]

    }
    league_collection.insert_one(newLeague);
    return jsonify({'league_code':id,"message": "League created successfully"}), 200

@user.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp =get_jwt()['exp'] 
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now+timedelta(minutes=2))
        if target_timestamp>exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity(),expires_delta=timedelta(minutes=15))
            data = response.get_json()
            if type(data) is dict:
                data['access_token'] = access_token
                response.data = json.dumps(data)
        return response
    except(RuntimeError,KeyError):
        return response
def unique_id(collection):
    while True:
        # Generate a new UUID
        new_id = str(uuid.uuid4())
        
        # Check if the UUID exists in the collection
        if not collection.find_one({'id': new_id}):
            return new_id
def create_unique_id_from_string(input_string): 
    hash_object = hashlib.sha256(input_string.encode())
    unique_id = hash_object.hexdigest()    
    return int(unique_id[:16], 16)% (10**8)