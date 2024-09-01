import React, { useState, useEffect } from "react";
import "../style/ExplanationPage.css";
import VideoPlayer from '../Components/VideoPlayer';
import Popup from '../Components/Popup';
import { Avatar} from '@radix-ui/themes';
const ExplanationPage = () => {
  const LEAGUES_ID = ['39', '140', '78', '135', '61'];

  const [leagues, setLeagues] = useState([]);

  const fetchData = async () => {
    try {
      const responses = await Promise.all(LEAGUES_ID.map(id => fetch(`/api/leagueInfo/${id}`)));
      const result = await Promise.all(responses.map(res => res.json()));
      setLeagues(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="explanation-container">
      <h1>Welcome to Dream Team League</h1>
      <Popup />
      <section>
        <h2>Key Features</h2>
        <ul>
          <li><strong>User Authentication</strong>: sign up, login, and profile management.</li>
          <li><strong>Team Management</strong>: Create, edit, and delete teams with ease.</li>
          <li><strong>Player Drafting</strong>: Draft players with detailed stats and filtering options.</li>
          <li><strong>League Management</strong>: Create or join leagues, and track league standings.</li>
          <li><strong>Real-Time Updates</strong>: Live scores and notifications for important events.</li>
        </ul>
      </section>
      <section>
        <h2>How to Use</h2>
        <h3>Getting Started</h3>
        <ol>
          <li><strong>Sign Up</strong>: Create an account with your email and password.</li>
          <li><strong>Login</strong>: Use your credentials to log in.</li>
        </ol>
        <h3>Creating and Managing Teams</h3>
        <ol>
          <li><strong>Create a Team</strong>: Enter a league name and draft players.</li>
          <li><strong>The user need to choose:</strong></li>
          <strong>11 players :</strong>
          <br/>
          <ul>
          <li>1 Goalkeeper</li>
          <li>3-5 Defender</li>
          <li>2-5 Midfielder</li>
          <li>1-3 Attacker</li>
          </ul>
          <li><strong>Manage Teams</strong>: Edit existing teams, add/remove players, and view stats.</li>
        </ol>
        <h3>Joining and Managing Leagues</h3>
        <ol>
          <li><strong>Create a League</strong>: Name your league and set the rules.</li>
          <li><strong>Choose one of the league</strong>: Name your league and set the rules.</li>
          {/* Render leagues here */}
          {leagues.length > 0 && (
            <div className="leagues-container">
              <h4>Available Leagues:</h4>
              <ul>
                {leagues.map(league => (
                  <li key={league.id}>
                  <Avatar size="1" src={league.logo} radius="full" fallback="T" color="indigo" />
                    <span>{league.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <li><strong>Join a League</strong>: Enter a league code or name to join an existing league.</li>
          <li><strong>View Standings</strong>: Track your team's rank in the league standings.</li>
        </ol>
        <h3>Substitutions Rules {'(option to edit the team)'}</h3>
        <ul>
          <li> Every user can make Substitutions only between rounds . (if the games of the league started the Substitutions window will be closed).</li>
          <li> The Substitutions window will be <b>open</b> 1 day after the round complete (1 day after the last match of the round at 7:00 A.M)</li>
          <li> The Substitutions window will be <b>Close</b> when the first match of the league round start .</li>
        </ul>


      </section>
    </div>
  );
};

export default ExplanationPage;
