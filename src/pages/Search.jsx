import React, { useState, useEffect, useRef } from 'react';
import { BsFillSearchHeartFill } from 'react-icons/bs';
import { music } from '../music'; // Import the music file

function Search({ onResultClick }) {
  const [searchInput, setSearchInput] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Filter songs based on search input within the entire music list
    const filtered = music.filter((song) =>
      song.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    // Sort the filtered songs alphabetically
    const sortedFilteredSongs = filtered.slice().sort((a, b) => a.name.localeCompare(b.name));

    setFilteredSongs(sortedFilteredSongs);
  }, [searchInput]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setShowDropdown(e.target.value.trim() !== ''); // Show dropdown only when there is input
  };

  const handleSearchClick = () => {
    inputRef.current.focus(); // Focus on the input field
    setShowDropdown(true);
  };

  const handleDropdownItemClick = (songName) => {
    setSearchInput(songName);
    setShowDropdown(false);

    // Pass the clicked song details to the parent component
    const clickedSong = music.find((song) => song.name === songName);
    onResultClick(clickedSong);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className="search">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search songs..."
          value={searchInput}
          onChange={handleSearchChange}
          onClick={handleSearchClick}
        />
        <button className="searchBtn">
          <i>
            <BsFillSearchHeartFill />
          </i>
        </button>
      </div>
      {/* Display filtered songs in a dropdown menu */}
      {showDropdown && (
        <div className="searchResults" style={dropdownStyle}>
          {filteredSongs.length > 0 ? (
            <ul style={listStyle}>
              {filteredSongs.map((song, index) => (
                <li
                  key={index}
                  style={listItemStyle}
                  onClick={() => handleDropdownItemClick(song.name)}
                >
                  {song.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No songs available</p>
          )}
        </div>
      )}
    </div>
  );
}

// CSS styles in JavaScript objects
const dropdownStyle = {
  position: 'absolute',
  zIndex: 1,
  backgroundColor: '#f9f9f9',
  border: '1px solid #ddd',
  width: '100%',
  maxHeight: '195px', // Set the max height to limit visible items
  overflowY: 'auto', // Enable scrolling if items exceed max height
};

const listStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
};

const listItemStyle = {
  padding: '8px',
  cursor: 'pointer',
  borderBottom: '1px solid #ddd',
};

export default Search;
