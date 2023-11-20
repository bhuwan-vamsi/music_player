import React, { useState, useEffect } from 'react';
import Song from './Song';
import Footer from './Footer';
import { music } from '../music.js';
import { useNavigate } from 'react-router-dom';
import '../css/Hpage.css';
import LeftMenu from './LeftMenu.jsx';

function MainComponent() {
  const navigate = useNavigate();
  const [activeSong, setActiveSong] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [songs, setSongs] = useState([]);
  const [likedSongsUpdated, setLikedSongsUpdated] = useState(false);

  let time = new Date().getHours();

  var headingString = '';

  if (time >= 4 && time <= 11) {
    headingString = 'Good Morning!';
  } else if (time >= 12 && time <= 17) {
    headingString = 'Good Afternoon!';
  } else if (time >= 18 && time <= 21) {
    headingString = 'Good Evening!';
  } else {
    headingString = 'Hello! Night Listeners!';
  }

  useEffect(() => {
    // Fetch liked songs data when the component mounts
    fetchLikedSongs();
  }, [likedSongsUpdated]); // Update the dependency array

  const fetchLikedSongs = async () => {
    try {
      // Assuming you have the user's email stored in localStorage
      const userEmail = localStorage.getItem('email');

      // Append user email as a query parameter
      const url = `http://localhost:5000/likedsong?userId=${userEmail}`;

      // Make a request to your server endpoint
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Convert the response to JSON
        if (response.status === 404) {
          setSongs([]);
        } else {
          const data = await response.json();
          setSongs(data.songs);
        }

        // Set the state variable to trigger a re-render in LeftMenu
        setLikedSongsUpdated(!likedSongsUpdated);
      } else {
        console.error('Error fetching liked songs');
      }
    } catch (error) {
      console.error('Error fetching liked songs:', error);
    }
  };

  function handleSongClick(songId) {
    console.log('Song clicked:', songId);
    setActiveSong(songId === activeSong ? null : songId);
  }

  function handlePlay(songId) {
    const playingSong = music.find((song) => song.id === songId);
    setCurrentlyPlaying(playingSong);
  }

  function handleProfileClick() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleDropdownItemClick(item) {
    console.log('Clicked on:', item);
    if (item === 'Item 1') {
      navigate('/account');
    } else if (item === 'Item 2') {
      navigate('/profile');
    } else if (item === 'Item 3') {
      navigate('/login');
    }
  }

  return (
    <div>
      <LeftMenu songs={songs} onLikedSongsUpdate={fetchLikedSongs} />
      <div className="mainComponent">
        <div className="mainContainerHeader">
          <h1 className="heading">{headingString}</h1>
          <span className="profileHeading" onClick={handleProfileClick}>
            Profile
          </span>
          {isDropdownOpen && (
            <div className="dropdownMenu">
              <ul>
                <li onClick={() => handleDropdownItemClick('Item 1')}>Account</li>
                <li onClick={() => handleDropdownItemClick('Item 2')}>Profile</li>
                <li onClick={() => handleDropdownItemClick('Item 3')}>Log Out</li>
              </ul>
            </div>
          )}
          <div className="songsList">
            {music.map((song) => (
              <Song
                key={song.id}
                title={song.name}
                artist={song.artist}
                url={song.img}
                value={song.id}
                file={song.filename}
                liked={songs.includes(song.id)}
                isActive={activeSong === song.id}
                onSongClick={() => handleSongClick(song.id)}
                onPlay={() => handlePlay(song.id)}
              />
            ))}
          </div>
        </div>
        {/* Render Footer only when a song is actively playing */}
        {currentlyPlaying && (
          <Footer
            value={currentlyPlaying.id}
            title={currentlyPlaying.name}
            artist={currentlyPlaying.artist}
            url={currentlyPlaying.img}
            file={currentlyPlaying.filename}
          />
        )}
      </div>
    </div>
  );
}

export default MainComponent;
