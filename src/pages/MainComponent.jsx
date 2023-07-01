import {React, useState, useEffect} from 'react';
import Song from './Song';

function MainComponent() {

  let time = new Date().getHours();
  var headingString = "";
  if (time >= 4 && time <= 11) {
    headingString = "Good Morning!";
  } else if (time >= 12 && time <= 17) {
    headingString = "Good Afternoon!";
  } else if (time >= 18 && time <= 21) {
    headingString = "Good Evening!";
  } else {
    headingString = "Hello! Night Listeners!";
  }

  return (
    <div className="mainComponent">
      <div className="mainContainerHeader">
        <h1 className="heading">{headingString}</h1>
      </div>
      <div className="mainContainerFooter"></div>
    </div>
  );
}

export default MainComponent;
