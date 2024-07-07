// src/VideoPlayer.js
import React from 'react';
import video from '../assets/video.mp4'

const VideoPlayer = () => {
    return (
        <div className="video-container">
        <video width="600" autoPlay muted controls>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };
  
  export default VideoPlayer;


