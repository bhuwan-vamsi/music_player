import React, { useEffect, useRef, useState } from "react";
import { BsFillPauseFill } from 'react-icons/bs';

function Footer({ value, title, artist, url, file }) {
  const [currTrack, setCurrTrack] = useState({
    id: value,
    name: title,
    artist_name: artist,
    imageUrl: url,
    filename: file,
  });
const [isPlaying, setPlayPauseClicked] = useState(false);

  const audioElement = useRef();
  const [currTime, setCurrTime] = useState(0);

  const handlePlayPause = () => {
    if (audioElement.current) {
      setPlayPauseClicked(!isPlaying);
    }
  };

  useEffect(() => {
    // Update internal state when the 'value' prop changes
    setCurrTrack((prevTrack) => ({
      ...prevTrack,
      id: value,
      name: title,
      artist_name: artist,
      imageUrl: url,
      filename: file,
    }));
  }, [value, title, artist, url, file]);

  useEffect(() => {
    if (audioElement.current) {
      // Set the source when the currTrack changes
      audioElement.current.src = require(`../songs/${currTrack.filename}`);
      // Load and play the audio
      isPlaying ? audioElement.current.play() : audioElement.current.pause();
    }
  }, [currTrack, isPlaying]);

  useEffect(() => {
    if (audioElement.current) {
      setCurrTime(audioElement.current.currentTime);
    }
  }, [currTime]);

  return (
    <div className="songFooter">
      <div className="footerSongPlayed">
        <div className="song">
          <img src={require(`../images/${currTrack.imageUrl}`)} alt="" />
          <div className="songDetails">
            <h2 className="songTitle">{currTrack.name}</h2>
            <p className="songArtist">{currTrack.artist_name}</p>
          </div>
        </div>
      </div>
      <div className="songControls">
        {/* <button id="masterButton" onClick={handlePlayPause}>
          <i>
            <BsFillPauseFill id={"play-pause"} />
          </i>
        </button> */}
        <audio ref={audioElement} controls>
          <source src={require(`../songs/${currTrack.filename}`)} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <div className="songLyrics">
        <button className="songLyricsBtn">Lyrics</button>
      </div>
    </div>
  );
}

export default Footer;
