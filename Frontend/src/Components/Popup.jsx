import React, { useState } from 'react';
import '../style/Popup.css'; // Import the CSS file

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);
  // const scoringRules = {
  //   Goal: 2,
  //   Assist: 1.5,
  //   Shot On Target: 1,
  //   Successful Pass: 0.1,
  //   Key Pass: 0.5,
  //   Dribble: 0.3,
  //   Tackle: 0.5,
  //   Interception: 0.5,
  //   Clearance: 0.3,
  //   Block: 0.5,
  //   Save: 2,
  //   Penalty Save: 3,
  //   Penalty Won: 2,
  //   Penalty Scored: 2,
  //   Cross: 0.2,
  //   Header Won: 0.2,
  //   Foul Drawn: 0.2,
  //   Foul Committed: -0.5,
  //   Yellow Card: -1,
  //   Red Card: -3,
  //   Offside: -0.5,
  //   Minutes Played: 0.01,
  //   Man Of The Match: 5
  // };
  
  return (
    <div>
      {!isOpen && (
        <button className="scroll-button" onClick={openPopup}>
          <span className="button-text">Score calculation</span>
        </button>
      )}
      {isOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Table Score:</h2>
            <ul class="list-group">
            <li class="list-group-item">Goal: 2 </li>
            <li class="list-group-item">Assist: 1.5</li>
            <li class="list-group-item">Shot On Target: 1</li>
            <li class="list-group-item"> Successful Pass: 0.1</li>
            <li class="list-group-item">Foul Committed: -0.5</li>
            <li class="list-group-item">Foul Drawn: 0.5</li>
            <li class="list-group-item">Yellow Card: -1</li>
            <li class="list-group-item">Red Card: -3</li>
            <li class="list-group-item">Pass: 0.5</li>
            <li class="list-group-item">Offside: -0.5</li>
          </ul>
            <button className="close-button" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
