import React from 'react';
import { RiNeteaseCloudMusicLine } from "react-icons/ri";
import { FaEllipsisH } from "react-icons/fa";
import {BsMusicNoteList} from "react-icons/bs";
import Search from './Search';

function LeftMenu() {

    return (
        <div className='leftMenu'>
            <div className='leftMenuHeader'>
                <div className='logo'>
                    <i><RiNeteaseCloudMusicLine/></i>
                    <h1>SoulKey</h1>
                    <i><FaEllipsisH/></i>
                </div>
                <div className="searchDiv">
                    <Search/>
                </div>   
            </div>
            <div className='leftMenuFooter'>
                <div className='library'>
                    <i><BsMusicNoteList/></i>
                    <h1>Your Library</h1>
                </div>
                <div className="searchDiv">
                    <Search/>
                </div> 
            </div>
        </div>
    )
}

export default LeftMenu;
