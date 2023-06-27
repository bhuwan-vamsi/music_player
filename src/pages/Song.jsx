import React from 'react';
import './Song.css';

function Song({ title, artist, imageUrl }) {
  return (
    <div className="songCard">
      <img className="songImage" src={imageUrl} alt="" />
      <div className="songDetails">
        <h2 className="songTitle">{title}</h2>
        <p className="songArtist">{artist}</p>
      </div>
    </div>
  );
}

export default Song;
