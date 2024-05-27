import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LRpage from './LRpage';
import Hpage from './Hpage';
import SoulKey from './SoulKey';
import Profile from './Profile';
import Account from './Account';
import Forgotpassword from './Forgotpassword';
import Resetpassword from './Resetpassword';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element = { <SoulKey/> } />
        <Route path="/login" element = { <LRpage/> } />
        <Route path="/home" element = { <Hpage/> } />
        <Route path="/profile" element = {<Profile/>} />
        <Route path="/account" element = {<Account/>} />
        <Route path="/forgotpassword" element = {<Forgotpassword/>} />
        <Route path="/reset-password/:token" element = {<Resetpassword/>} />
      </Routes>
    </div>
  )
}

export default App;
