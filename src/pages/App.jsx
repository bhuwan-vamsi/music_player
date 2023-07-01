import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LRpage from './LRpage';
import Hpage from './Hpage';
import SoulKey from './SoulKey';
import Error from './Error';
import Footer from './footer';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element = { <SoulKey/> } />
        <Route path="/login" element = { <LRpage/> } />
        <Route path="/home" element = { <Hpage/> } />
        <Route path="/error" element = { <Error/> } />
      </Routes>
    </div>
  )
}

export default App;
