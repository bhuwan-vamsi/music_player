import React, { useEffect, useRef, useState } from "react";
import { BsStar } from 'react-icons/bs';
import LyricsPopUp from "./Lyrics";

function Footer({ value, title, artist, url, file }) {
  const [currTrack, setCurrTrack] = useState({
    id: value,
    name: title,
    artist_name: artist,
    imageUrl: url,
    filename: file,
  });

  const audioElement = useRef();
  const [rating, setRating] = useState(0);
  const [lyrics, setLyrics] = useState('');
  const [showLyricsPopup, setShowLyricsPopup] = useState(false);

  const handleRatingClick = (ratedValue) => {
    setRating(ratedValue);

    const userEmail = localStorage.getItem('email');
    const songId = currTrack.id;

    fetch('http://localhost:5000/api/songs/rate-song', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail,
        songId,
        rating: ratedValue,
      }),
    })
      .then(response => response.json())
      .catch(error => console.error('Error:', error));
  };

  const handleFetchLyrics = () => {
    const songId = currTrack.id;
  
    fetch('http://localhost:5000/api/songs/get-song-lyrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        songId,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch lyrics');
        }
        return response.json();
      })
      .then(data => {
        setLyrics(data.songDetails.lyrics || 'Lyrics not available');
        setShowLyricsPopup(true);
      })
      .catch(error => console.error('Error fetching song lyrics:', error));
  };

  const handleCloseLyricsPopup = () => {
    setShowLyricsPopup(false);
  };

  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    const songId = currTrack.id;
  
    fetch('http://localhost:5000/api/songs/get-song-rating', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail,
        songId,
      }),
    })
      .then(response => {
        if (response.status === 404) {
          throw new Error('Song rating not found (404)');
        } else if (response.status === 201) {
          setRating(0); // Set song rating to 0 if method is not allowed
          return; // Exit early, no need to process the response further
        } else if (!response.ok) {
          throw new Error('Failed to fetch song rating');
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          setRating(data.rating || 0); // Set rating to the returned value or 0
        }
      })
      .catch(error => console.error('Error fetching song rating:', error));
  }, [currTrack.id]);
  

  useEffect(() => {
    setCurrTrack((prevTrack) => ({
      ...prevTrack,
      id: value,
      name: title,
      artist_name: artist,
      imageUrl: url,
      filename: file,
    }));

    if (audioElement.current) {
      audioElement.current.src = require(`../songs/${file}`);
      audioElement.current.load();
    }

  }, [value, title, artist, url, file]);

  return (
    <div className="songFooter">
      <div className="footerSongPlayed">
        <div className="song">
          <img src={require(`../images/${currTrack.imageUrl}`)} alt="" />
          <div className="songDetails">
            <h2 className="songTitle">{currTrack.name}</h2>
            <p className="songArtist">{currTrack.artist_name}</p>
          </div>
        </div>
      </div>
      <div className="songControls">
        <audio ref={audioElement} controls>
          <source src={require(`../songs/${currTrack.filename}`)} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="rightPart">
        <div className="songRating">
          {[1, 2, 3, 4, 5].map((star) => (
            <BsStar
              key={star}
              style={{ color: star <= rating ? 'yellow' : 'white'}}
              onClick={() => handleRatingClick(star)}
            />
          ))}
        </div>
        <div className="songLyrics">
          <button className="songLyricsBtn" onClick={handleFetchLyrics}>Lyrics</button>
          {showLyricsPopup && <LyricsPopUp lyrics={lyrics} onClose={handleCloseLyricsPopup} />}
        </div>
      </div>
    </div>
  );
}

export default Footer;

