import React, { useState, useEffect } from 'react';
import Popup from './Popup';

function Song({ value, title, artist, url, liked, onPlay }) {
  const [isLiked, setIsLiked] = useState(liked);
  const [isInPlaylist, setIsInPlaylist] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const handlePlaylistButtonClick = () => {
      setShowPopup((prevShowPopup) => !prevShowPopup);
  };

    async function handleLikeClick() {

    const userId = localStorage.getItem('email');
    const songId = value;
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);

    try {
      const response = await fetch('http://localhost:5000/like-song', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          songId: songId,
          like: newLikeStatus,
        }),
      });

      if (!response.ok) {
        console.error('Failed to update like status on the server');
       }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handlePopupSubmit = async (playlistName) => {
    const userEmail = localStorage.getItem('email');
    const songId = value;
    try {
      const response = await fetch('http://localhost:5000/add-to-playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: userEmail,
          songId: songId,
          playlistName: playlistName,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Log the server response message
        setIsInPlaylist(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
      } else {
        console.error('Failed to add song to playlist');
      }
    } catch (error) {
      console.error('Error in handlePopupSubmit:', error);
    }
  };
  

  return (
    <div className="song" style={{ position: 'relative' }} onClick={() => onPlay()}>
      <img src={require(`../images/${url}`)} alt="" />
      <div className="songDetails">
        <h2 className="songTitle">{title}</h2>
        <p className="songArtist">{artist}</p>
      </div>
      <div className="plbuttons">
        <div className="playlistButton">
          <span
            onClick={handlePlaylistButtonClick}
            style={{
              cursor: 'pointer',
              fontSize: '24px',
              color: isInPlaylist ? 'blue' : 'white',
            }}
          >
            &#43;
          </span>
        </div>
        <div className="likeButton" style={{ position: 'absolute', bottom: 10, right: 10 }}>
          <span
            onClick={handleLikeClick}
            style={{
              cursor: 'pointer',
              fontSize: '24px',
              color: isLiked ? 'red' : 'white',
            }}
          >
            &#10084;
          </span>
        </div>
      </div>
      <Popup isOpen={showPopup} onClose={() => setShowPopup(false)} onSubmit={handlePopupSubmit} />
    </div>
  );
}

export default Song;
