import {React} from 'react';
import LeftMenu from './LeftMenu';
import MainComponent from './MainComponent';
import Footer from './footer';
import '../css/Hpage.css';

function Hpage() {

  return (
    <div className='home'>
      <LeftMenu/>
      <MainComponent/>
      <Footer/>
    </div>
  );
}

export default Hpage;
