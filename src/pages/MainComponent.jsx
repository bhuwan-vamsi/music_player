import React from 'react';
import Song from './Song';
function MainComponent() {
    let time=new Date().getHours();
    let headingString ="";
    if(time<12)
        headingString="Good Morning!";
    else if(time>12 && time<=5)
        headingString="Good Afternoon!";
    else
        headingString="Good Evening!";
  return (
      <div className="mainComponent">
        <div className="mainContainerHeader">
            <h1 className='heading'>{headingString}</h1>
            <div className="songsList">
                <Song/>
            </div>
        </div>
        <div className="mainContainerFooter"></div>
      </div>
  )
}

export default MainComponent;