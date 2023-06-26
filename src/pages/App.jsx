import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LRpage from './LRpage';
import Hpage from './Hpage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element = { <Hpage/> } />
        <Route path="/home" element = { <LRpage/> } />
      </Routes>
    </div>
  )
}

export default App