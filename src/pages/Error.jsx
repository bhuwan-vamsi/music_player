import React from 'react'
import '../css/Error.css';
import {Link} from "react-router-dom";
function Error() {
  return (
    <div className='errorPage'>
        <img src='https://static.vecteezy.com/system/resources/previews/006/549/647/original/404-landing-page-free-vector.jpg' alt=''/>
        <h1>OOPS!</h1>
        <p>The page you are looking for doesn't exist or an other error occured, go back to home page</p>
        <Link to= "/home" >
            <button>Go to Home</button>
        </Link>
        <div className="errorPageBottom"></div>
    </div>
  )
}

export default Error;
