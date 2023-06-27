import React from 'react';
import LeftMenu from './LeftMenu';
import MainComponent from './MainComponent';
import SongFooter from './SongFooter';
import './Hpage.css';

function Hpage() {
  return (
    <div>
      <LeftMenu/>
      <MainComponent/>
      <SongFooter/>
    </div>
  )
}

export default Hpage
