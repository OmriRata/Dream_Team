from flask import Flask,request,jsonify
import requests
from flask_cors import CORS,cross_origin
import pymongo
import os
import pprint
from werkzeug.security import generate_password_hash,check_password_hash 



printer = pprint.PrettyPrinter()
"""
    *********** using Sport API from Rpid APi. ***********
"""
HEADERS = {
        "X-RapidAPI-Key": "93b410e9abmshddaee8631d23438p128048jsn4f687c9a9322",
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
    }
URL = "https://api-football-v1.p.rapidapi.com/v3/"
SEASON = "2023"


DB_URL = "mongodb+srv://Dream_Team:8XUzq7rcn6w1gf3d@dreamteam.lvd2kmm.mongodb.net/"
#mongodb+srv://Dream_Team:8XUzq7rcn6w1gf3d@dreamteam.lvd2kmm.mongodb.net/


app = Flask(__name__)
CORS(app)
#password = os.environ.get("DB_PWD")
client = pymongo.MongoClient(DB_URL)
db = client.myDb
usrs = db.users



"""
    This function return the league ID based on the country name provided.
    
    param country_name: The `country_name` parameter is a string representing the name of a country for
    which you want to retrieve the league ID. This function sends a GET request to a specific URL
    endpoint with the country name as a query parameter to fetch the league information. The function
    returns the league ID.
    return: The function `getLeagueIdByCountry` is returning the league ID of the first league that
    matches the provided country name.
    example : http://localhost:5000/api/leagueId/spain
    return  : { "id": 140,"logo": "https://media.api-sports.io/football/leagues/140.png","name": "La Liga","type": "League"} 
"""
@app.route("/api/leagueId/<country_name>") 
def getLeagueIdByCountry(country_name):
    querystring = {"country":country_name}

    response = requests.get(URL+"leagues", headers=HEADERS, params=querystring)
    print(response.json()["response"][0]["league"])
    return response.json()["response"][0]["league"]



"""
    This function retrieves the statistics of a player with a specific ID.
    
    param player_id: The `player_id` parameter in the `getPlayerStatisticsById` function is used to
    specify the ID of the player for whom you want to retrieve statistics. This function makes a GET
    request to a URL endpoint with the player ID and season as query parameters to fetch the player's
    statistics.
    return: The function is making a GET request to a URL with player statistics based on the player_id
    provided in the route parameter. It returns the statistics of the player with the specified player_id (list of statisticts ,for each league).
"""
@app.route("/api/playerStatistics/<player_id>") 
def getPlayerStatisticsById(player_id):
    querystring = {"id":player_id,"season":SEASON}
    
    response = requests.get(URL+"players", headers=HEADERS, params=querystring)
    print(response.json()["response"][0]["player"])
    print(response.json()["response"][0]["statistics"])
    return response.json()["response"][0]["statistics"]



"""
    This function retrieves a list of players belonging to a specific team by making a GET
    request to a specified URL endpoint.
    
    param team_id: The `team_id` parameter in the code snippet represents the unique identifier of a
    team for which you want to retrieve the list of players. This endpoint is designed to fetch the
    players belonging to a specific team based on the `team_id` provided in the URL path.
    return: The code snippet is making a GET request to a specific endpoint to retrieve a list of
    players belonging to a particular team.
    The list of players is returned as the output of the function.

    example : http://localhost:5000/api/players/42
    return  : list of objects that each object is info about the specified team player.
"""
@app.route("/api/players/<team_id>") 
def getPlayersByTeam(team_id):
    querystring = {"team":team_id}
    
    response = requests.get(URL+"players/squads", headers=HEADERS, params=querystring)
    print(response.json()["response"][0]["team"])
    print(response.json()["response"][0]["players"])
    return response.json()["response"][0]["players"]



"""
    This function retunrs the ID and information of a team by its name using an API call.
    
    param team_name : The `team_name` parameter in this function represents the name of the team for
    which you want to retrieve the team ID. This code snippet defines a route in a Flask application
    that takes the team name as a parameter in the URL and then makes a GET request to a specific URL
    with the team.
    return : The code is returning the team information in JSON format (object) for the team with the specified
    name. It includes the team's ID and other details.

    example : http://localhost:5000/api/teamId/arsenal
    return  : {'id': 42, 'name': 'Arsenal', 'code': 'ARS', 'country': 'England', 'founded': 1886, 'national': False, 'logo': 'https://media.api-sports.io/football/teams/42.png'}
"""
@app.route("/api/teamId/<team_name>") 
def getTeamIdByName(team_name):

    querystring = {"name":team_name}

    response = requests.get(URL+"teams", headers=HEADERS, params=querystring)
    print(response.json()["response"][0]["team"]["id"])
    return jsonify(response.json()["response"][0]["team"])



"""
    This function returns list of teams in a specific league based on the league ID.
    
    param league_id: The `league_id` parameter in the `getTeamsByLeague` function is used to specify
    the ID of the league for which you want to retrieve teams. This function sends a GET request to the
    specified URL with the league ID and season as query parameters to fetch information about teams in
    that league for.
    return: The function `getTeamsByLeague` is returning a list of teams information for the specified
    league ID. The list contains information about each team participating in the league, such as team
    name, ID, and other relevant details.

    example : http://localhost:5000/api/leagueTeams/39
    return : list of objects that each object is info about premier league team.
"""
@app.route("/api/leagueTeams/<league_id>")
def getTeamsByLeague(league_id):
    querystring = {"league":league_id,"season":SEASON}

    response = requests.get(URL+"teams", headers=HEADERS, params=querystring)
    teams_info = [ i["team"] for i in response.json()["response"] ]
    print(teams_info)
    ##print(response.json()["response"][0])
    return teams_info

##register
@app.route('/register', methods=['POST'])
@cross_origin()
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    

    # Simple user registration logic (no database involved for simplicity)
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Check if user already exists
    users = usrs.find()

    if usrs.find_one({"username":username}) or usrs.find_one({"email":email}):
        return jsonify({"error": "User already exists"}), 400
    

    # Add new user
    newUser = {
        "username":username,
        "pwd":generate_password_hash(password),
        "email":email,
    }
    usrs.insert_one(newUser);
    response = jsonify("User registered successfully")
    response.status_code = 200

    return response


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    user = usrs.find_one({'username':username})
    if not user:
        return jsonify({"error": "User Not exists"}), 400

    elif not check_password_hash(user['pwd'],password):
        return jsonify({"error": "Incorrect Password"}), 400

    print(check_password_hash(user['pwd'],password))
    return jsonify("User Login successfully"),200



@app.route("/") 
def home():
    return "Home";


if __name__ == "__main__":
    app.run(debug=True)