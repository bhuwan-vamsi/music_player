import React, { useState, useEffect } from 'react';
import Popup from './Popup';

function Song({ value, title, artist, url, liked, onPlay, onLikeUpdate, onPlaylistUpdate }) {
  const [isLiked, setIsLiked] = useState(liked);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const handleLikeClick = async () => {
    const userId = localStorage.getItem('email');
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);

    try {
      const response = await fetch('http://localhost:5000/api/songs/like-song', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, songId: value, like: newLikeStatus }),
      });
      if (response.ok) {
        onLikeUpdate();  // Trigger the like update in MainComponent
      }
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  const handlePopupSubmit = async (playlistName) => {
    const userEmail = localStorage.getItem('email');
    try {
      const response = await fetch('http://localhost:5000/api/playlists/add-to-playlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail, songId: value, playlistName }),
      });
      if (response.ok) {
        onPlaylistUpdate();  // Trigger playlist update in LeftMenu
      }
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    }
  };

  return (
    <div className="song" onClick={() => onPlay()}>
      <img src={require(`../images/${url}`)} alt="" />
      <div className="songDetails">
        <h2>{title}</h2>
        <p>{artist}</p>
      </div>
      <div>
        <span onClick={handleLikeClick} style={{ color: isLiked ? 'red' : 'white' }}>
          &#10084;
        </span>
        <span onClick={() => setShowPopup(true)}>&#43;</span>
      </div>
      {showPopup && (
        <Popup isOpen={showPopup} onClose={() => setShowPopup(false)} onSubmit={handlePopupSubmit} />
      )}
    </div>
  );
}

export default Song;
