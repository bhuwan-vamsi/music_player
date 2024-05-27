import React from 'react';
import '../css/Profile.css';

function ProfilePage() {
  
  const user = {
    
};

  const playlists = [

  ];

  const likedSongs = [

  ];

  return (
    <div className="profilePage">
      <div className="profileContainer">
        <img src={user.avatarUrl} alt="Profile Avatar" className="avatar" />
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
        <div className="playlists">
          <h3>Playlists</h3>
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id}>{playlist.name}</li>
            ))}
          </ul>
        </div>
        <div className="likedSongs">
          <h3>Liked Songs</h3>
          <ul>
            {likedSongs.map((song) => (
              <li key={song.id}>{song.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
