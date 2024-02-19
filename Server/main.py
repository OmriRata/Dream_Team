from flask import Flask,request,jsonify
import requests

HEADERS = {
        "X-RapidAPI-Key": "93b410e9abmshddaee8631d23438p128048jsn4f687c9a9322",
        "X-RapidAPI-Host": "api-football-beta.p.rapidapi.com"
    }

URL = "https://api-football-v1.p.rapidapi.com/v3/"
SEASON = "2023"


app = Flask(__name__)



@app.route("/leagueId/<country_name>") 
def getLeagueIdByCountry(country_name):
    querystring = {"country":country_name}

    response = requests.get(URL+"leagues", headers=HEADERS, params=querystring)
    print(response.json()["response"][0]["league"])
    return response.json()["response"][0]["league"]



@app.route("/players/<team_name>") 
def getTeamIdByName(team_name):
    pass


@app.route("/teamId/<team_name>") 
def getTeamIdByName(team_name):

    querystring = {"name":team_name}

    response = requests.get(URL+"teams", headers=HEADERS, params=querystring)

    print(response.json()["response"][0]["team"]["id"])
    return str(response.json()["response"][0]["team"])


@app.route("/leagueTeams/<league_id>")
def getTeamsByLeague(league_id):
    querystring = {"league":league_id,"season":SEASON}

    response = requests.get(URL+"teams", headers=HEADERS, params=querystring)
    teams_info = [x["team"] for x in response.json()["response"]]
    print(teams_info)
    ##print(response.json()["response"][0])
    return "DONE"






@app.route("/") 
def home():
    return "Home";


if __name__ == "__main__":
    app.run(debug=True)