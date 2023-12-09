import React, { useEffect } from 'react';
import { RiNeteaseCloudMusicLine } from 'react-icons/ri';
import { FaEllipsisH } from 'react-icons/fa';
import { BsMusicNoteList } from 'react-icons/bs';
import Search from './Search';
import '../css/Hpage.css';
import { music } from '../music.js';

function LeftMenu({ songs, onLikedSongsUpdate }) {

  const getSongNamesFromIds = (songIds) => {
    return songIds.map((songId) => {
      const foundSong = music.find((song) => song.id === songId);
      return foundSong ? foundSong.name : null;
    });
  };

  // Get an array of song names from the provided song IDs
  const likedSongNames = getSongNamesFromIds(songs);

  useEffect(() => {
    // Callback to parent component when liked songs are updated
    onLikedSongsUpdate();
  }, [songs, onLikedSongsUpdate]);

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

        </div>
      </div>
    </div>
  );
}

export default LeftMenu;
