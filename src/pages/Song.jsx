import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';

function Song() {
  const [isPlaying, setIsPlaying] = useState(false);
  const sound = new Howl({ src: ['C:\\Users\\bhunv\\OneDrive\\Desktop\\spotify\\src\\songs\\Kaise Hua Kabir Singh 128 Kbps.mp3'] });

  useEffect(() => {
    // Cleanup function
    return () => {
      // Stop the sound when the component is unmounted
      sound.stop();
    };
  }, [sound]); // Include sound as a dependency

  const playSong = () => {
    sound.play();
    setIsPlaying(true);
  };

  const stopSong = () => {
    sound.stop();
    setIsPlaying(false);
  };

  return (
    <div className="song">
      <img src="https://i.pinimg.com/736x/34/ab/fb/34abfbab34d7f35aeb67528bca22b359.jpg" alt="" />
      <div className='songDetails'>
        <h2>Title</h2>
        <p>Artist</p>
      </div>
      {isPlaying ? (
        <button onClick={stopSong}>Stop</button>
      ) : (
        <button onClick={playSong}>Play</button>
      )}
    </div>
  );
}

export default Song;
