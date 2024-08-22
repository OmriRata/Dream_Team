from crontab import CronTab
import requests
from dotenv import load_dotenv
import os
import pymongo
from datetime import date,timedelta
from bson.objectid import ObjectId


LEAGUES_ID = ['39', '140', '78', '135', '61','40'];


load_dotenv('../.env')

################    using Sport API from Rpid API.    ################
HEADERS = {
        "X-RapidAPI-Key": os.getenv('RapidAPI_Key'),
        "X-RapidAPI-Host": os.getenv('RapidAPI_Host')
    }
URL =  os.getenv('RapidAPI_URL')
SEASON = "2024"


################    connect to mongoDB.     ################
DB_URL = "mongodb://localhost:27017/"
DB_URL1 = os.getenv('DB_URL')
client = pymongo.MongoClient(DB_URL)
db = client.myDb
users_collection = db.users
league_collection=db.league
teams_collection=db.teams


def getsUserLeaguesById():
    leagues_map = {}
    for leagueId in LEAGUES_ID:
        leagues = league_collection.find({'league_id':int(leagueId)})
        x = []
        for userLeague in list(leagues):
            x.append(userLeague['league_code'])
        leagues_map[leagueId] = x 
    return leagues_map



def getChampionsLeagueGames(leagueId):
    fixtures = []
    id = 2
    today = date.today()

    # yesterday = today - timedelta(days=1) 
    _from = today - timedelta(days=2) 
    _to = today - timedelta(days=1) 
    querystring = {"league":leagueId,"season":SEASON,'from':_from,"to":_to}

    response = requests.get(URL+'fixtures', headers=HEADERS,params=querystring)

    games = response.json()['response']
    for game in games:
        fixtures.append(game['fixture']['id'])
    return fixtures

def getGameInfo(fixtureId):
    querystring = {"id":fixtureId}

    response = requests.get(URL+'fixtures', headers=HEADERS,params=querystring)

    info = response.json()['response'][0]
    return info 


def getStats(game):
    goals = {}
    assists = {}
    played = {}
    for event in game['events']:
        if event['type'] == 'Goal':
            if event['player']['id'] in goals: 
                goals[event['player']['id']] += 3
            else:
                goals[event['player']['id']] = 3
            
            assistId = event['assist']['id'] 
            if assistId:
                if assistId in assists:
                    assists[assistId] += 2
                else:
                    assists[assistId] = 2
    
    for team in game['players']:
        for player in team['players']:
            if player['statistics'][0]['games']['minutes'] and player['statistics'][0]['games']['minutes'] >= 60 :
                playerId = player['player']['id']
                played[playerId] = 1
                    
    return goals,assists,played


        
def calculatePoints(team,goals,assists,played):
    points = team['points']
    players = team['players']
    
    for player in players:
        player_id = player['player']['id'];
        if player_id in goals:
            points += goals[player_id]
        if player_id in assists:
            points += assists[player_id]
        if player_id in played:
            points += played[player_id]
    
    return points
    

def updatePoints(team,new_points):
    team_id = team['_id']
    query = {"_id": ObjectId(team_id) }

    update = {"$set": {"points":new_points}}  # Change this to your update

    result = teams_collection.find_one_and_update(
    query, 
    update, 
    return_document=True)


def main():
    leagues_map = getsUserLeaguesById()

    leagues_map = {'2':[37733397]}  # example for league with 1 team that i created to test

    for league in leagues_map:
        fixtures = getChampionsLeagueGames(league)
        goals = {}
        assists = {}
        play_over_60 = {}
        for fixture in fixtures:
            gameInfo = getGameInfo(fixture)
            
            g,a,p = getStats(gameInfo)
            goals |= g
            assists |= a
            play_over_60 |= p

        total_teams = []
        for league_code in leagues_map[league]:
            teams = teams_collection.find({'league_code':league_code})
            total_teams += list(teams)
        for team in list(total_teams):
            new_points = calculatePoints(team,goals,assists,play_over_60);
            updatePoints(team,new_points)
        # print(total_teams)
        # print("goals: " ,goals)
        # print("----------------------------------")
        # print("assists: " ,assists)
        # print("----------------------------------")
        # print("played: " ,play_over_60)

if __name__ == "__main__":
    main()
    
