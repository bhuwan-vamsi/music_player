import React, { useState } from 'react';

function Popup({ isOpen, onClose, onSubmit }) {
  const [playlistInput, setPlaylistInput] = useState('');

  const handlePopupSubmit = () => {
    onSubmit(playlistInput);
    onClose();
  };

  return (
    isOpen && (
      <div className="popup">
        <label>
          Which playlist do you want to add this song to?
          <input
            type="text"
            value={playlistInput}
            onChange={(e) => setPlaylistInput(e.target.value)}
          />
        </label>
        <button onClick={handlePopupSubmit}>OK</button>
      </div>
    )
  );
}

export default Popup;
