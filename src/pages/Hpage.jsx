import {React} from 'react';
import LeftMenu from './LeftMenu';
import MainComponent from './MainComponent';
import Footer from './Footer';
import '../css/Hpage.css';

function Hpage() {

  return (
    <div className='home'>
      <LeftMenu/>
      <MainComponent/>
    </div>
  );
}

export default Hpage;
