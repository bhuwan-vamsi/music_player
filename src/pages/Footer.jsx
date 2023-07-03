//import statements
import React, {useContext, useEffect, useRef, useState} from "react";
import { BsFillCaretLeftFill, BsFillPauseFill, BsFillCaretRightFill } from 'react-icons/bs';

function Footer({ value, title, artist, url ,file}) {

    const [{ id, name, artist_name, img, filename }, setCurrTrack] = useState({
        id: value,
        name: title,
        artist_name: artist,
        imageUrl: url,
        filename: file,
      });
    const [isPrevClicked, setPrevClicked] = useState(false);
    const [isNextClicked, setNextClicked] = useState(false);
    const [isPlaying, setPlayPauseClicked] = useState(false);

    const audioElement = useRef();
    const [isVolumeClicked, setVolumeClicked] = useState(false);
    const [volume, setVolume] = useState(50);
    const [seekTime, setSeekTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currTime, setCurrTime] = useState(0);


    const handleButton = (val) => {
        switch (val.target.id) {
            case "prevSong":
                setPrevClicked(val);
                break;
            case "play-pause":
                setPlayPauseClicked(!isPlaying);
                break;
            case "nextSong":
                setNextClicked(val);
                break;
            default:
                break;
        }
    }


    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
    };


    useEffect(() => {
        isPlaying
            ? audioElement.current.play().then(()=>{}).catch((e)=>{audioElement.current.pause(); audioElement.current.currentTime=0;})
            : audioElement.current.pause();
        audioElement.current.volume = volume / 100;
        audioElement.current.onloadeddata = () => {
            if (audioElement.current != null)
                setDuration(audioElement.current.duration)
        };
        setInterval(() => {
            if (audioElement.current !== null)
                setCurrTime(audioElement.current.currentTime);
        })
    });


    useEffect(() => {
        setSeekTime((currTime) / (duration / 100))
    }, [currTime, duration]);


    useEffect(()=>{
        audioElement.current.onended = ()=> {
            setNextClicked(true);
        };
    })

    return (
        <div className="songFooter">
            <div className="footerSongPlayed">
                <div className="song">
                    <img src={require(`../images/${url}`)} alt="" />
                    <div className="songDetails">
                        <h2 className="songTitle">{name}</h2>
                        <p className="songArtist">{artist_name}</p>
                    </div>
                </div>
            </div>
            <div className="songControls">

                <audio ref={audioElement} src={require(`../songs/${filename}`)} preload={"metadata"}/>

                <button id="backwardButton" onClick={handleButton}>
                    <i>
                        <BsFillCaretLeftFill id={"prevSong"} />
                    </i>
                </button>

                <button id="masterButton" onClick={handleButton}>
                    <i>
                        <BsFillPauseFill id={"play-pause"}/>
                    </i>
                </button>
                <button id="forwardButton" onClick={handleButton}>
                    <i>
                        <BsFillCaretRightFill id={"nextSong"}/>
                    </i>
                </button>
            </div>
            <div className="songLyrics">
                <button className="songLyricsBtn">Lyrics</button>
            </div>
        </div>
    );
}

export default Footer;