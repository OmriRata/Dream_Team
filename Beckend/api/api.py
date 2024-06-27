from flask import Blueprint,request,jsonify
import requests
from flask_jwt_extended import jwt_required
from dotenv import load_dotenv
import os


api = Blueprint('api',__name__)

load_dotenv('../env')
#                 using Sport API from Rpid APi.              #
HEADERS = {
        "X-RapidAPI-Key": os.getenv('RapidAPI_Key'),
        "X-RapidAPI-Host": os.getenv('RapidAPI_Host')
    }
URL =  os.getenv('RapidAPI_URL')
SEASON = "2024"


# player statistic by team id and league id
@api.route("/playerStatistics/<team_id>") 
def getPlayerStatisticsById(team_id):
    querystring = {"id":team_id,"season":SEASON}
    response = requests.get(URL+"players", headers=HEADERS, params=querystring)
    
    return response.json()["response"][0]["statistics"]


@api.route("/players/<team_id>") 
def getPlayersByTeam(team_id):
    querystring = {"team":team_id}
    
    response = requests.get(URL+"players/squads", headers=HEADERS, params=querystring)
    print(response.json()["response"][0]["team"])
    print(response.json()["response"][0]["players"])
    return response.json()["response"][0]["players"]



@api.route("/teamId/<team_name>") 
@jwt_required()
def getTeamIdByName(team_name):

    querystring = {"name":team_name}

    response = requests.get(URL+"teams", headers=HEADERS, params=querystring)
    print(response.json()["response"][0]["team"]["id"])
    return jsonify(response.json()["response"][0]["team"])

@api.route("/leagueTeams/<league_id>")
def getTeamsByLeague(league_id):
    querystring = {"league":league_id,"season":SEASON}

    response = requests.get(URL+"teams", headers=HEADERS, params=querystring)
    teams_info = [ i["team"] for i in response.json()["response"] ]
    print(teams_info)
    ##print(response.json()["response"][0])
    return teams_info


@api.route("/leagueId/<country_name>") 
@jwt_required()
def getLeagueIdByCountry(country_name):
    querystring = {"country":country_name}

    response = requests.get(URL+"leagues", headers=HEADERS, params=querystring)
    print(response.json()["response"][0]["league"])
    return response.json()["response"][0]["league"]

@api.route("/leagueInfo/<league_id>") 
# @jwt_required()
def getLeagueInfoById(league_id):
    querystring = {"id":league_id}

    response = requests.get(URL+"leagues", headers=HEADERS, params=querystring)
    print("=================================")
    print(response.json())
    print("=================================")
    return response.json()["response"][0]["league"]