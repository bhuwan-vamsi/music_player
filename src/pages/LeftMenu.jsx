import React, { useState } from 'react';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import { FaEllipsisH } from 'react-icons/fa';
import { BsMusicNoteList } from 'react-icons/bs';
import '../css/Hpage.css';
import { music } from '../music.js';

function LeftMenu({ songs, playlists = [], onPlaylistUpdate }) {  // Default playlists to an empty array
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const getSongNamesFromIds = (songIds) => {
    return songIds.map((songId) => {
      const foundSong = music.find((song) => song.id === songId);
      return foundSong ? foundSong.name : null;
    });
  };

  // Get an array of song names from the provided song IDs
  const likedSongNames = getSongNamesFromIds(songs);

  const handlePlaylistCreation = async () => {
    try {
      // Call the API to create a new playlist
      const response = await fetch('http://localhost:5000/api/playlists/create-playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: localStorage.getItem('email'),
          playlistName: newPlaylistName,
        }),
      });

      if (response.ok) {
        console.log('Playlist created successfully');
        // Reset the input field after creating the playlist
        setNewPlaylistName('');

        onPlaylistUpdate();  // Trigger playlist update
      } else {
        console.error('Error creating playlist:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <div className="leftMenu">
      <div className="leftMenuHeader">
        <div className="logo">
          <i>
            <RiNeteaseCloudMusicLine />
          </i>
          <h1>SoulKey</h1>
          <i>
            <FaEllipsisH />
          </i>
        </div>
      </div>
      <div className="leftMenuFooter">
        <div className="library">
          <i>
            <BsMusicNoteList />
          </i>
          <h1>Your Library</h1>
        </div>
        <div className='LikedSongs'>
          <h3>Liked Songs : </h3>
          <ul>
            {likedSongNames.map((songName, index) => (
              <li key={index}>{songName}</li>
            ))}
          </ul>
        </div>
        <div className="playlists">
          <h4>Playlists :</h4>
          <ul>
            {playlists.map((playlist, index) => (
              <li key={index}>
                {playlist.name} - {playlist.numberOfSongs} songs
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Enter playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          {/* Button to create a new playlist */}
          <button onClick={handlePlaylistCreation}>+</button>
        </div>
      </div>
    </div>
  );
}

export default LeftMenu;
