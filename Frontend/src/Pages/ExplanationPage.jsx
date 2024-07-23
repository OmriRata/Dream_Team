import React from 'react';
import "../style/ExplanationPage.css";
import VideoPlayer from '../Components/VideoPlayer';
import Popup from '../Components/Popup';
const ExplanationPage = () => {
  return (
    <div className="explanation-container">
      <h1>Welcome to Dream Team League</h1>
      <Popup/>
      <section>
        <h2>Key Features</h2>
        <ul>
          <li><strong>User Authentication</strong>: Secure sign up, login, and profile management.</li>
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
          <li><strong>Create a Team</strong>: Enter a team name and draft players.</li>
          <li><strong>Manage Teams</strong>: Edit existing teams, add/remove players, and view stats.</li>
        </ol>
        <h3>Joining and Managing Leagues</h3>
        <ol>
          <li><strong>Create a League</strong>: Name your league and set the rules.</li>
          <li><strong>Join a League</strong>: Enter a league code to join an existing league.</li>
          <li><strong>View Standings</strong>: Track your team's rank in the league standings.</li>
        </ol>
      </section>
    </div>
  );
};

export default ExplanationPage;
