import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LRpage from './LRpage';
import Hpage from './Hpage';
import SoulKey from './SoulKey';
import Error from './Error';
import Profile from './Profile';
import Account from './Account';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element = { <SoulKey/> } />
        <Route path="/login" element = { <LRpage/> } />
        <Route path="/home" element = { <Hpage/> } />
        <Route path="/error" element = { <Error/> } />
        <Route path="/profile" element = {<Profile/>} />
        <Route path="/account" element = {<Account/>} />
      </Routes>
    </div>
  )
}

export default App;
