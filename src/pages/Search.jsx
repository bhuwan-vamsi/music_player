import React from 'react'
import {BsFillSearchHeartFill} from "react-icons/bs";
function Search() {
  return (
    <div>
        <div className="search">
            <input type="text" placeholder='search...'></input>
            <button className='searchBtn'>
                <i><BsFillSearchHeartFill/></i>
            </button>
        </div>
    </div>
  )
}

export default Search;
