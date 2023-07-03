import React, { useEffect, useState } from 'react';
import Footer from './Footer';

function Song({ value, title, artist, url,file }) {

  const [showFooter, setShowFooter] = useState(false);

  function handleSongClick() {
    setShowFooter(true);
  }

  return (
    <div className="song" onClick={handleSongClick}>
      <img src={require(`../images/${url}`)} alt="" />
      <div className="songDetails">
        <h2 className="songTitle">{title}</h2>
        <p className="songArtist">{artist}</p>
      </div>
      {showFooter && (
        <Footer value={value} title={title} artist={artist} url={url} file={file}/>
      )}
    </div>
  );
}

export default Song;
