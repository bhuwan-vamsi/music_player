import React, { useState, useEffect } from 'react';

function Song({ value, title, artist, url,liked, onPlay }) {
  const [isLiked, setIsLiked] = useState(liked);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Update the isLiked state when the liked prop changes
    setIsLiked(liked);
  }, [liked]);

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

  return (
    <div className="song" style={{ position: 'relative' }} onClick={() => { onPlay() }}>
      <img src={require(`../images/${url}`)} alt="" />
      <div className="songDetails">
        <h2 className="songTitle">{title}</h2>
        <p className="songArtist">{artist}</p>
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
  );
}

export default Song;
