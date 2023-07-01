import React, { useState } from 'react';
import Footer from './footer';

function Song({ value, title, artist, imageUrl }) {
  const [showFooter, setShowFooter] = useState(false);

  function handleSongClick() {
    setShowFooter(true);
  }

  return (
    <div className="song" onClick={handleSongClick}>
      <img src={imageUrl} alt="" />
      <div className="songDetails">
        <h2 className="songTitle">{title}</h2>
        <p className="songArtist">{artist}</p>
      </div>
      {showFooter && (
        <Footer/>
      )}
    </div>
  );
}

export default Song;