
import React from 'react';

function LyricsPopUp({ lyrics, onClose }) {
  const handleButtonClick = () => {
    // Call the onClose callback to notify the parent component to close the pop-up
    onClose();
  };

  return (
    <div className='Lyrics-pop-up'>
      <button className='close-pop-up' onClick={handleButtonClick}>
        x
      </button>
      <pre style={{ whiteSpace: 'pre-line' }}>{lyrics}</pre>
    </div>
  );
}

export default LyricsPopUp;