import React from 'react';
import '../css/SoulKey.css';
import {Link} from "react-router-dom";
function SoulKey() {
  return (
    <div className='soulKey'>
      <div className="nav-item">
          <a className="navbar-brand" href="/">SoulKey</a>
      </div>
      <div className="main-row">
          <div className="main-row-text">
              <h1>Music for everyone</h1>
              <p> Unlock the soulful essence of music.</p>
              <Link to={"/login"} className="btn">
                  Start Listening
              </Link>
          </div>
      </div>
    </div>
  )
}

export default SoulKey;