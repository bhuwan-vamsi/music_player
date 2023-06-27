import React, { useEffect, useState } from 'react';
import Song from './Song';

function MainComponent() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Make an HTTP GET request to retrieve the songs from your database API
    fetch('/home')
      .then(response => response.json())
      .then(data => setSongs(data))
      .catch(error => {
        console.log('Error retrieving songs:', error);
      });
  }, []);

  let time = new Date().getHours();
  let headingString = "";
  if (time < 12) {
    headingString = "Good Morning!";
  } else if (time >= 12 && time <= 17) {
    headingString = "Good Afternoon!";
  } else {
    headingString = "Good Evening!";
  }

  return (
    <div className="mainComponent">
      <div className="mainContainerHeader">
        <h1 className="heading">{headingString}</h1>
        <div className="songsList">
          {songs.map(song => (
            <Song
              key={song.id}
              title={song.title}
              artist={song.artist}
              imageUrl={song.imageUrl}
            />
          ))}
        </div>
      </div>
      <div className="mainContainerFooter"></div>
    </div>
  );
}

export default MainComponent;
