// Popup.js
import React, { useState } from 'react';
import '../style/Popup.css'; // Import the CSS file

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <div>
      <button className="scroll-button" onClick={openPopup}>Score calculator</button>
      {isOpen && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Popup Title</h2>
            <p>This is a scrollable content area.</p>
            <p>More content here...</p>
            <p>Even more content...</p>
            <p>Keep scrolling...</p>
            <button className="scroll-button" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
