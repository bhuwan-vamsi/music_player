import React, { useState } from 'react';
import Song from './Song';
import { music } from '../music.js';
import { useNavigate } from 'react-router-dom';

function MainComponent() {

  const navigate = useNavigate();
  const [activeSong, setActiveSong] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  function handleSongClick (songId) {
    setActiveSong(songId === activeSong ? null : songId);
  };

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
    <div className="mainComponent">
      <div className="mainContainerHeader">
        <h1 className="heading">{headingString}
          <span className="profileIcon" onClick={handleProfileClick}>
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
        </h1>
        <div className="songsList">
          {music.map((song) => (
            <Song
              key={song.id}
              title={song.name}
              artist={song.artist}
              url={song.img}
              value={song.id}
              file={song.filename}
              isActive={activeSong === song.id}
              onSongClick={ () =>handleSongClick(song.id) }
            />
          ))}
        </div>
      </div>
      <div className="mainContainerFooter"></div>
    </div>
  );
}

export default MainComponent;
