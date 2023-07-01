import {React, useState, useEffect} from 'react';
import Song from './Song';

function MainComponent() {

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = () => {
    fetch('/home')
      .then(response => response.json())
      .then(data => setSongs(data))
      .catch(error => {
        console.log('Error retrieving songs:', error);
      });
  };

  let time = new Date().getHours();
  var headingString = "";
  if (time >= 4 && time <= 11) {
    headingString = "Good Morning!";
  } else if (time >= 12 && time <= 17) {
    headingString = "Good Afternoon!";
  } else if (time >= 18 && time <= 21) {
    headingString = "Good Evening!";
  } else {
    headingString = "Hello! Night Listeners!";
  }

  return (
    <div className="mainComponent">
      <div className="mainContainerHeader">
        <h1 className="heading">{headingString}</h1>
        <div className="songsList">
          {songs.map(song => (
            <Song 
              key={song.song_id} // Add a unique key prop for each song
              value={song.song_id}
              title={song.name}
              artist={song.artist}
              imageUrl={song.image_url}
            />
          ))}
        </div>
      </div>
      <div className="mainContainerFooter"></div>
    </div>
  );
}

export default MainComponent;
