//import statements
import React, {useContext, useEffect, useRef, useState} from "react";
import { BsFillCaretLeftFill, BsFillPauseFill, BsFillCaretRightFill } from 'react-icons/bs';

function Footer() {

    const [{id, name, artist, filename}, setCurrTrack] = useState({id:0, name:"Ae Dil Hai Mushkil", artist:"Arijit Singh", filename:"Ae Dil Hai Mushkil.mp3"});
    const [isPrevClicked, setPrevClicked] = useState(false);
    const [isNextClicked, setNextClicked] = useState(false);
    const [isPlaying, setPlayPauseClicked] = useState(false);

    const audioElement = useRef();
    const [isVolumeClicked, setVolumeClicked] = useState(false);
    const [volume, setVolume] = useState(50);
    const [seekTime, setSeekTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currTime, setCurrTime] = useState(0);

    const handleButton = (type, val) => {
        switch (type) {
            case "prevSong":
                setPrevClicked(val);
                break;
            case "play-pause":
                setPlayPauseClicked(val);
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
                    <img src="" alt="" />
                    <div className="songDetails">
                        <h2 className="songTitle">{name}</h2>
                        <p className="songArtist">{artist}</p>
                    </div>
                </div>
            </div>
            <div className="songControls">

                <audio ref={audioElement} src={require(`../songs/${filename}`)} preload={"metadata"}/>

                <button id="backwardButton" type={"prevSong"} onClick={handleButton}>
                    <i>
                        <BsFillCaretLeftFill />
                    </i>
                </button>

                <button id="masterButton" type={"play-pause"} onClick={handleButton}>
                    <i>
                        <BsFillPauseFill />
                    </i>
                </button>
                <button id="forwardButton" type={"nextSong"} onClick={handleButton}>
                    <i>
                        <BsFillCaretRightFill />
                    </i>
                </button>
            </div>
            <div className="songLyrics">
                <button className="songLyricsBtn">Lyrics</button>
            </div>
            <div className="playback-widgets">
                <div className="timer">
                    <p>
                        <span>{formatTime(currTime)}</span>
                        /
                        <span>{formatTime(duration)}</span>
                    </p>
                </div>
                <div className={"slider"}>
                    <Slider style={{color: useStyle.theme}} value={volume} onChange={handleVolumeChange}/>
                </div>
                <ControlsToggleButton style={pointer} type={"volume"}
                                      defaultIcon={<VolumeUpIcon/>}
                                      changeIcon={<VolumeOffIcon/>}
                                      onClicked={handleToggle}/>
            </div>
        </div>
    );
}

export default Footer;