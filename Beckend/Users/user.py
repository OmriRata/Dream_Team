import json
from flask import Blueprint,request,jsonify
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity,jwt_required,JWTManager,unset_jwt_cookies
from datetime import timedelta,timezone,datetime
import pymongo

user = Blueprint('user',__name__)


DB_URL = "mongodb://localhost:27017/"
client = pymongo.MongoClient(DB_URL)
db = client.myDb
users_collection = db.users


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