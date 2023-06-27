import React from 'react';
import Song from './Song';
import {BsFillCaretLeftFill, BsFillPauseFill,BsFillCaretRightFill } from "react-icons/bs";

function SongFooter() {
  return (
    <div className='songFooter'>
        <div className="footerSongPlayed">
        </div>
        <div className="songControls">
            <i><BsFillCaretLeftFill/></i>
            <i><BsFillPauseFill/></i>
            <i><BsFillCaretRightFill/></i>
            <div className="songTimeline">
                <hr />
            </div>
        </div>
        <div className="songLyrics">
            <button className="songLyricsBtn">Lyrics</button>
        </div>
    </div>
  )
}

export default SongFooter;
