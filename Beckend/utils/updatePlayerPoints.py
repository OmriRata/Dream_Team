import requests
from dotenv import load_dotenv
import os
import pymongo
from datetime import date,timedelta
from bson.objectid import ObjectId
import math



LEAGUES_ID = ['78','135','39', '140', '61','40'];
# LEAGUES_ID = ['78'];


load_dotenv('/home/omrirata/DreamTeam/Dream_Team/Beckend/.env')

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



def getLeagueGames(leagueId):
    fixtures = []
    # id = 2
    today = date.today()

    yesterday = today - timedelta(days=1) 
    # _from = today - timedelta(days=1) 
    # _to = today - timedelta(days=1) 
    querystring = {"league":leagueId,"season":SEASON,'date':yesterday}

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
    goals = {}      # +3 points
    assists = {}    # +2 points
    played = {}     # +1 points
    played60 = {}   # +2 points
    ownGoal = {}    # -2 points
    commitedPenalty = {}  # -2 points
    missPenalty= {} # -1 points
    wonPenalty = {} # +4 points
    yellowCard = {} # -1 points
    redCard = {}    # -2 points 
    cleanSheet = {} # +4 points
    penaltySave = {}# +3 points
    threeSaves = {} # +1 points
    
    players = game.get('players')
    
    for team in players:
        isHome ='away' if game['teams']['home']['name'] == team['team']['name'] else 'home'

        for player in team['players']:
            playerId = player['player']['id']
            stats = player['statistics'][0]
            position = player['statistics'][0]['games']['position']
            if stats['games']['minutes'] and player['statistics'][0]['games']['minutes'] >= 60 :
                played60[playerId] = 2
            elif stats['games']['minutes'] and 0 < player['statistics'][0]['games']['minutes'] < 60 :
                played60[playerId] = 1
            if (position == 'G' or position == 'D') and  game['goals'][isHome] == 0 :
                cleanSheet[playerId] = 4;
            
            # every goal for goalkeeper and defender is 4 points
            if (position == 'G' or position == 'D') and stats['goals']['total']:
                goals[playerId] = stats['goals']['total']*4
            
            # every goal for midfielder and attacker is 3 points
            elif stats['goals']['total'] and stats['goals']['total']>0:
                goals[playerId] = stats['goals']['total']*3
            
            # every assist is 2 points
            if stats['goals']['assists']:
                assists[playerId] = stats['goals']['assists']*2
            
            # every penalty save for goalkeeper is 3 points
            if position == 'G' and stats['penalty']['saved']:
                penaltySave[playerId] = stats['penalty']['saved']*3;
            
            # every 3 saves for goalkeeper is 1 point
            if position == 'G' and stats['goals']['saves']:
                threeSaves[playerId] = math.floor(stats['goals']['saves']/3);
            
            # every yellow card is (-2) points
            if stats['cards']['yellow'] and stats['cards']['yellow'] > 0:
                yellowCard[playerId] = stats['cards']['yellow'] * -1
            
            # every red card is (-2) points
            if stats['cards']['red'] and stats['cards']['red'] > 0:
                redCard[playerId] = stats['cards']['red'] * -2
            
            # every commited penalty is (-1) point
            if stats['penalty']['missed'] and stats['penalty']['missed'] > 0 :
                missPenalty[playerId] = stats['penalty']['missed']*-1
            
            # every commited penalty is (-2) points
            if stats['penalty']['commited'] and stats['penalty']['commited'] > 0 :
                commitedPenalty[playerId] = stats['penalty']['commited']*-2
            
            # every won penalty is 2 points
            if stats['penalty']['won'] and stats['penalty']['won'] > 0 :
                wonPenalty[playerId] = stats['penalty']['won']*2
    
    # calculate ownGoals points of the players
    for event in game['events']:
        if event['type'] == 'Goal' and event['detail'] == 'Own Goal' :
            playerId = event['player']['id'];
            if playerId in ownGoal:
                ownGoal[playerId] += (-2)
            else:
                ownGoal[playerId] = (-2)
    
    return goals,assists,played,played60,ownGoal,commitedPenalty,missPenalty,wonPenalty,yellowCard,redCard,cleanSheet,penaltySave,threeSaves

        
def calculatePoints(team,goals,assists,played,played60,ownGoal,commitedPenalty,missPenalty,wonPenalty,yellowCard,redCard,cleanSheet,penaltySave,threeSaves):
    points = team['points']
    players = team['players']
    for player in players:
        player_id = player['player']['id'];
 
        points += goals[player_id] if player_id in goals else 0;    # points for goals
        points += assists[player_id] if player_id in assists else 0;# points for assits
        points += played[player_id] if player_id in played else 0;  # points for played
        points += played60[player_id] if player_id in played60 else 0;# points for played more then 60 minutes
        points += ownGoal[player_id] if player_id in ownGoal else 0;   # points for own goals
        points += commitedPenalty[player_id] if player_id in commitedPenalty else 0;# points for commited penalty
        points += missPenalty[player_id] if player_id in missPenalty else 0;    # points for missed penalty
        points += wonPenalty[player_id] if player_id in wonPenalty else 0;      # points for won penalty
        points += yellowCard[player_id] if player_id in yellowCard else 0;      # points for yellow card
        points += redCard[player_id] if player_id in redCard else 0;            # points for red card
        points += cleanSheet[player_id] if player_id in cleanSheet else 0;      # points for clean sheet
        points += penaltySave[player_id] if player_id in penaltySave else 0;    # points for penalty save
        points += threeSaves[player_id] if player_id in threeSaves else 0;      # points for goalkeeper 3 saves
    return points
    

def updatePoints(team,new_points):
    team_id = team['_id']
    query = {"_id": ObjectId(team_id) }

    update = {"$set": {"points":new_points}}  # Change this to your update

    teams_collection.find_one_and_update(
    query, 
    update, 
    return_document=True)

def main():
    leagues_map = getsUserLeaguesById()

    # leagues_map = {'2':[37733397]}  # example for league with 1 team that i created to test

    for league in leagues_map:
        fixtures = getLeagueGames(league)
        goals = {}
        assists = {}
        played = {}
        played60 = {}
        ownGoal = {}
        commitedPenalty = {}
        missPenalty = {}
        wonPenalty = {}
        yellowCard = {}
        redCard = {}
        cleanSheet = {}
        penaltySave = {}
        threeSaves = {}

        for fixture in fixtures:
            gameInfo = getGameInfo(fixture)
            g, a,p, p60, og, cp, mp, wp, yc, rc, cs, ps, ts = getStats(gameInfo)
            goals |= g
            assists |= a
            played |= p
            played60 |= p60
            ownGoal |= og
            commitedPenalty |= cp
            missPenalty |= mp
            wonPenalty |= wp
            yellowCard |= yc
            redCard |= rc
            cleanSheet |= cs
            penaltySave |= ps
            threeSaves |= ts
        total_teams = []
        for league_code in leagues_map[league]:
            teams = teams_collection.find({'league_code':league_code})
            total_teams += list(teams)
        for team in list(total_teams):
            new_points = calculatePoints(team,goals,assists,played,played60,ownGoal,commitedPenalty,missPenalty,wonPenalty,yellowCard,redCard,cleanSheet,penaltySave,threeSaves);
            updatePoints(team,new_points)   # update the points on the database


if __name__ == "__main__":
    main()
