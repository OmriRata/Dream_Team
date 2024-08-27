import React, { useState } from 'react';
import '../style/Popup.css'; 

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <div>
      {!isOpen && (
        <button className="scroll-button" onClick={openPopup}>
          <span className="button-text">Score Calculation</span>
        </button>
      )}
      {isOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Table Score:</h2>
            <ul className="list-group">
            <li className="list-group-item">Player played: 1 point</li>
            <li className="list-group-item">Player played above 60 min: 2 points</li>
            <li className="list-group-item">Assist: 2 points</li>
            <li className="list-group-item">Every 3 saves by a goalkeeper: 1 point</li>
              <li className="list-group-item">Goal: </li>
              <ol>
                <li>Own goal: -2 points</li>
                <li>GoalKeeper, Defender: 4 points</li>
                <li>Midfielder, Attacker: 3 points</li>
              </ol>
              <li className="list-group-item">Cards: </li>
              <ol>
                <li>Yellow card: -1 point</li>
                <li>Red card: -2 points</li>
              </ol>
              <li className="list-group-item">Clean goal:</li>
              <ol>
                <li>GoalKeeper, Defender: 4 points</li>
              </ol>
              <li className="list-group-item">Penalties:</li>
              <ol>
                <li>Penalty squeeze: 2 points</li>
                <li>Penalty stoppage: 3 points</li>
                <li>Missed a penalty: -1 point</li>
                <li>Causing a penalty: -2 points</li>
              </ol>
            </ul>
            <button className="close-button" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
