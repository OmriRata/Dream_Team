import json
from flask import Blueprint,request,jsonify
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity,jwt_required,JWTManager,unset_jwt_cookies
from datetime import timedelta,timezone,datetime
import pymongo
import uuid
import hashlib

user = Blueprint('user',__name__)


DB_URL = "mongodb://localhost:27017/"
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

    # Check if user already exists
    users = users_collection.find()

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
    players = data.get('players')
    username = data.get('username')
    newTeam = {
        "league_code":league_code,
        "players":players,
        'username':username,
    }
    teams_collection.insert_one(newTeam);
    return jsonify({"message": "League created successfully"}), 200

@user.route('/getTeamPlayers',methods=['POST'])
def getPlayers():
    data = request.json
    username = data.get('username')
    user = teams_collection.find_one({'username':username})
    
    if not user:
        return jsonify({"error": "User Not exists"}), 400
    
    return jsonify({"players":user["players"]}),200
    

@user.route('/getUserLeagues',methods=['POST'])
def getLeagues():
    data = request.json
    username = data.get('username')
    query = {'participants': {'$in': [username]}}
    result = league_collection.find(query)
    

    # Print the results
    if not list(league_collection.find(query)):
        return jsonify({"error": "ther is no leagues for this user"}), 400

        
    for doc in result:
        print(doc)


    return jsonify({'leagues': list(result)})



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
    if  league_id == ""  or league_name=="" :
        return jsonify({"error": "Please fill in both fields."}), 400
    newLeague = {
        "league_name":league_name,
        "league_id":league_id,
        # "email":email,
        'username':username,
        'id':id,
        'participants':[username]

    }
    league_collection.insert_one(newLeague);
    return jsonify({"message": "League created successfully"}), 200

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