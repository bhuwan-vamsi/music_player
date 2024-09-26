import React, { useEffect, useState } from 'react';
import Song from './Song';
import Footer from './Footer';
import { music } from '../music.js';
import { useNavigate } from 'react-router-dom';
import '../css/Hpage.css';
import LeftMenu from './LeftMenu.jsx';
import Search from './Search';

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
    fetchLikedSongs();
  }, [likedSongsUpdated]);

  const fetchLikedSongs = async () => {
    try {
      const userEmail = localStorage.getItem('email');
      const url = `http://localhost:5000/api/songs/likedsong?userId=${userEmail}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        if (response.status === 404) {
          setSongs([]);
        } else {
          const data = await response.json();
          setSongs(data.songs);
        }
        setLikedSongsUpdated(!likedSongsUpdated);
      } else {
        console.error('Error fetching liked songs');
      }
    } catch (error) {
      console.error('Error fetching liked songs:', error);
    }
  };

  function handleSongClick(songId) {
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
    } 
    // else if (item === 'Item 2') {
    //   navigate('/profile');
    // } 
    else if (item === 'Item 3') {
      navigate('/login');
      localStorage.setItem('email', '');
    }
  }

  const handleSearchResultClick = (clickedSong) => {
    setCurrentlyPlaying(clickedSong);
  };

  return (
    <div>
      <LeftMenu
        songs={songs}
        onLikedSongsUpdate={fetchLikedSongs}
      />
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
                {/* <li onClick={() => handleDropdownItemClick('Item 2')}>Profile</li> */}
                <li onClick={() => handleDropdownItemClick('Item 3')}>Log Out</li>
              </ul>
            </div>
          )}
          <div className="searchcomponent">
            <Search onResultClick={handleSearchResultClick} />
          </div>
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
