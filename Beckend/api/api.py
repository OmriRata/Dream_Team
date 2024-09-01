from flask import Blueprint,request,jsonify
import requests
from flask_jwt_extended import jwt_required
from dotenv import load_dotenv
import os
import aiohttp
import asyncio
from threading import Timer
from utils.util import checkIsStarted



api = Blueprint('api',__name__)

load_dotenv('../env')

################    using Sport API from Rpid APi.    ################
HEADERS = {
        "X-RapidAPI-Key": os.getenv('RapidAPI_Key'),
        "X-RapidAPI-Host": os.getenv('RapidAPI_Host')
    }
URL =  os.getenv('RapidAPI_URL')
SEASON = "2024"


# player statistic by team id and league id
@api.route("/playerStatistic/<player_id>") 
def getPlayerStatisticsById(player_id):
    querystring = {"id":player_id,"season":SEASON}
    response = requests.get(URL+"players", headers=HEADERS, params=querystring)
    # print(response.json()['response'][0])
    print(response.json())
    # statistics = response.json()['response'][0]['statistics']
    # points = calculatePlayerPoints(statistics)
    return response.json()['response'][0]

# player statistic by team id and league id
@api.route("/playerStatistics/<team_id>") 
def getPlayerStatisticsByTeamId(team_id):
    querystring = {"team":team_id,"season":SEASON}
    response = requests.get(URL+"players", headers=HEADERS, params=querystring)
    
    return response.json()["response"]


@api.route("/players/<team_id>") 
def getPlayersByTeam(team_id):
    querystring = {"team":team_id,"season":SEASON}
    # querystring = {"league":"39","season":"2023"}

    
    response = requests.get(URL+"players", headers=HEADERS, params=querystring)
    return response.json()["response"]


@api.route("/nextMatch/<league_id>") 
def getNextMatch(league_id):
    querystring = {"id":"1215853"}
    response = requests.get(URL+'fixtures', headers=HEADERS, params=querystring)

    fixtures = response.json()["response"]
    for i in fixtures:
        print(i)
    return fixtures[0]

@api.route("/playersByLeague/<league_id>") 
async def getPlayersByLeague(league_id):

    async def fetch_data(session,params):
        async with session.get(URL+"players", headers=HEADERS, params=params) as response:
            print(params)
            return await response.json()

    querystring = {"league":league_id,"season":SEASON}
    
    response = requests.get(URL+"players", headers=HEADERS, params=querystring)

    # return response.json()['response']
    total_pages = response.json()["paging"]['total']
    print(total_pages)
    async with aiohttp.ClientSession() as session:
        tasks = []  
        for page in range(1, 11 ):
            copyQuery = querystring.copy()
            copyQuery['page'] = str(page)
            tasks.append(fetch_data(session,copyQuery))
        
        # Fetch all pages concurrently, limiting the number of concurrent tasks
        responses = await asyncio.gather(*tasks)
    
    all_data = []
    for response in responses:
            all_data.extend(response['response'])
    return all_data


@api.route("/teamId/<team_name>") 
# @jwt_required()
def getTeamIdByName(team_name):

    querystring = {"name":team_name}

    response = requests.get(URL+"teams", headers=HEADERS, params=querystring)
    return jsonify(response.json()["response"][0]["team"])

@api.route("/leagueTeams/<league_id>")
def getTeamsByLeague(league_id):
    querystring = {"league":league_id,"season":SEASON}

    response = requests.get(URL+"teams", headers=HEADERS, params=querystring)
    teams_info = [ i["team"] for i in response.json()["response"] ]
    return teams_info

@api.route("/leagueId/<country_name>") 
# @jwt_required()
def getLeagueIdByCountry(country_name):
    querystring = {"country":country_name}

    response = requests.get(URL+"leagues", headers=HEADERS, params=querystring)
    return response.json()["response"][0]["league"]

@api.route("/leagueInfo/<league_id>") 
# @jwt_required()
def getLeagueInfoById(league_id):
    querystring = {"id":league_id}
    response = requests.get(URL+"leagues", headers=HEADERS, params=querystring)
    return response.json()["response"][0]['league']