from dotenv import load_dotenv
import os
# from updatePlayerPoints import getLeagueGames
import pytz
from datetime import datetime
import requests

load_dotenv('/home/omrirata/DreamTeam/Dream_Team/Beckend/.env')
################    using Sport API from Rpid APi.    ################
HEADERS = {
        "X-RapidAPI-Key": os.getenv('RapidAPI_Key'),
        "X-RapidAPI-Host": os.getenv('RapidAPI_Host')
    }
URL =  os.getenv('RapidAPI_URL')
SEASON = "2024"


def getCurrentRound(leagueId):
    querystring = {"league":leagueId,"season":SEASON,"current":'true'}
    response = requests.get(URL+'fixtures/rounds', headers=HEADERS, params=querystring)
    return response.json()['response'][0]

def getGamesByRound(leagueId,round):
    querystring = {"league":leagueId,"season":SEASON,"round":round}
    response = requests.get(URL+'fixtures', headers=HEADERS, params=querystring)
    return response.json()['response']


def getStartDate(leagueId):
    round = getCurrentRound(leagueId)
    games = getGamesByRound(leagueId,round)
    
    teams = [(i['fixture']['id'],i['fixture']['date'])for i in games ]
    parsed_events = [(id, datetime.fromisoformat(time)) for id, time in teams]
    parsed_events.sort(key=lambda x: x[1])
    return parsed_events[0]


def getEndDate(leagueId):
    round = getCurrentRound(leagueId)
    games = getGamesByRound(leagueId,round)
    teams = [(i['fixture']['id'],i['fixture']['date'])for i in games ]
    parsed_events = [(id, datetime.fromisoformat(time)) for id, time in teams]

    parsed_events.sort(key=lambda x: x[1])
    parsed_events.reverse()
    return parsed_events[0]


def getSortedTime(firstMatch):
    lst = [firstMatch]
    now = ('now',datetime.fromisoformat(str(datetime.now(pytz.utc))))
    lst.append(now)
    lst.sort(key=lambda x: x[1])

    return lst

def checkIsStarted(leagueId):
    firstMatch = getStartDate(leagueId)
    sorted = getSortedTime(firstMatch)
    if sorted[0][0] == 'now':
        return False,firstMatch[1].strftime('%Y-%m-%d %H:%M:%S %Z')
    else:   
        lastMatch = getEndDate(leagueId)
        return True , lastMatch[1].strftime('%Y-%m-%d %H:%M:%S %Z')

def main():
    pass
    leagueId = '39'
    firstMatch = getStartDate(leagueId)
    sorted =getSortedTime(firstMatch)
    lastMatch = getEndDate(leagueId)

if __name__ == "__main__":
    main()