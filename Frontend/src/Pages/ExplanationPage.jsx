import React from 'react';
import "../style/ExplanationPage.css";

const ExplanationPage = () => {
  return (
    <div className="explanation-container">
      <h1>Welcome to Dream Team League</h1>
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

      <section>
        <h2>Underlying Technologies</h2>
        <h3>Front-End</h3>
        <ul>
          <li><strong>React</strong>: User interface framework.</li>
          <li><strong>Redux</strong>: State management.</li>
          <li><strong>React Router</strong>: Navigation management.</li>
          <li><strong>Axios</strong>: API requests.</li>
        </ul>
        <h3>Back-End</h3>
        <ul>
          <li><strong>Node.js and Express</strong>: RESTful API.</li>
          <li><strong>MongoDB</strong>: Database.</li>
          <li><strong>JWT</strong>: User authentication.</li>
        </ul>
        <h3>Real-Time Features</h3>
        <ul>
          <li><strong>Socket.io</strong>: Real-time updates.</li>
        </ul>
        <h3>Deployment</h3>
        <ul>
          <li><strong>Netlify</strong>: Front-end deployment.</li>
          <li><strong>Heroku</strong>: Back-end deployment.</li>
        </ul>
      </section>

      <section>
        <h2>Conclusion</h2>
        <p>
          The Dream Team League application provides an immersive and interactive experience for fantasy sports enthusiasts. With a user-friendly interface and powerful features, managing your fantasy teams has never been easier. Dive in, create your dream team, and compete with friends to see who comes out on top!
        </p>
      </section>
    </div>
  );
};

export default ExplanationPage;
