import React from 'react';
import '../css/Profile.css';

function ProfilePage() {
  const user = {
    name: 'Anya',
    nickname: 'Peaches',
    email: 'anya@gmail.com',
    bio: 'I am a very cute girl and dirty too...',
    avatarUrl: 'https://w0.peakpx.com/wallpaper/632/1014/HD-wallpaper-anime-spy-x-family-anya-forger.jpg',
    password: 'iamhorny',
    DOB: '23-05-2004',
    gender: 'Female',
};

  const playlists = [
    { id: 1, name: 'Playlist 1' },
    { id: 2, name: 'Playlist 2' },
    { id: 3, name: 'Playlist 3' },
  ];

  const likedSongs = [
    { id: 1, name: 'Song 1' },
    { id: 2, name: 'Song 2' },
    { id: 3, name: 'Song 3' },
  ];

  const topSongs = [
    { id: 1, name: 'Top Song 1' },
    { id: 2, name: 'Top Song 2' },
    { id: 3, name: 'Top Song 3' },
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

        <div className="topSongs">
          <h3>Top Songs</h3>
          <ul>
            {topSongs.map((song) => (
              <li key={song.id}>{song.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
