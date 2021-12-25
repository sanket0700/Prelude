import React from "react";
import jwt from 'jsonwebtoken';
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import './player.css';
import { MdSkipNext, MdSkipPrevious, MdPlayCircleFilled, MdPauseCircleFilled } from 'react-icons/md';


const Player = () => {

    const token = localStorage.getItem('token');
    const user = jwt.decode(token);
    
    if(!user){
        localStorage.removeItem('token');
        window.location.href = "/";
    }
    
    const location = useLocation();
    const [ songReferenceID, setSongReferenceID ] = useState("");
    const [ cover, setCover ] = useState("");
    const [ songLiked, setSongLiked ] = useState("");
    const [ name, setName ] = useState(null);
    const [ artist, setArtist ] = useState("");
    const [ flag, setFlag ] = useState(false);
    const [ isPlaying, setIsPlaying ] = useState(false);
    const audioPlayer = useRef();
    const [ duration, setDuration ] = useState(0);
    const [ percentage, setPercentage ] = useState(0);
    const [ currTime, setCurrTime ] = useState(0)


    const calculateTime = (secs) => {
        const minutes = Math.floor(secs/60);
        const returnedMinutes = minutes < 10  ?  `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs%60);
        const returnedSeconds = seconds < 10  ?  `0${seconds}` : `${seconds}`;

        return `${returnedMinutes}:${returnedSeconds}`;
    }


    useEffect(() => {
        setSongReferenceID(location.state.reference);
        setCover(location.state.cover);
        setSongLiked(location.state.liked);
        setName(location.state.name);
        setArtist(location.state.artistName);
        setFlag(true);
    }, [location, flag]);

    
    async function sendLikedUpdate(flag) {
        const confirmation = await fetch((`/user/updateLikedSong/${user.email}`), {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                song: songReferenceID,
                liked: flag
            })
        });

        if(confirmation.status===500){
            console.log("error")
        }
    }


    const togglePlay = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if(!prevValue){
            audioPlayer.current.play();
        } else{
            audioPlayer.current.pause();
        }
    }
    
    const changeProg = (e) => {
        audioPlayer.current.currentTime = (duration/100)*e.target.value;
        setPercentage(e.target.value);
    }


    return(
        flag ?
            <div className="entire-player">
                <div className="cover-player">
                    <img src={`/cover-art/${cover}`} className="song-cover-art" alt={name} />
                    <div className="like-player">
                        {
                            <FormControlLabel id="like-icon-player" onChange={(e) => {
                                    setSongLiked(e.target.checked);
                                    sendLikedUpdate(e.target.checked);
                                }}
                                control={<Checkbox checked={songLiked} icon={<FavoriteBorder style={{fill: "black", width: "25", height: "24"}}/>} 
                                        checkedIcon={<Favorite style={{fill: "red", width: "25", height: "24"}} />}
                                />}
                            />
                        }
                    </div>
                </div>
                
                <div className="player-song">
                    <div className="details-song">
                        <p className="give-name">{name}</p>
                        <p className="give-artist">{artist}</p>
                    </div>
                    <audio
                        ref={audioPlayer} 
                        id="player" 
                        src={`/play/${songReferenceID}`} 
                        type="audio/mpeg" 
                        preload="metadata"
                        onLoadedData={(e) => {
                            setDuration(e.currentTarget.duration);
                        }}
                        onTimeUpdate={(e) => {
                            setCurrTime(e.currentTarget.currentTime);
                            setPercentage((e.currentTarget.currentTime*100/duration));
                        }}
                     >
                     </audio>
                    <div className="progbar">
                        <div className="curr">
                            {calculateTime(currTime)}
                        </div>
                        <div className="progress">
                            <input type="range" step="0.01" value={percentage} onChange={changeProg} className="range-bar" />
                        </div>
                        <div className="complete">
                        {calculateTime(duration)}
                        </div>
                    </div>
                    <div className="controls">
                        <button id="player-button" className="prev"><MdSkipPrevious /></button>
                        <button id="player-button" onClick={togglePlay} className="playPause">
                            {
                                isPlaying ? <MdPauseCircleFilled /> : <MdPlayCircleFilled />
                            }
                        </button>
                        <button id="player-button" className="next"><MdSkipNext /></button>
                    </div>
                </div>
            </div>
            : 
            <div className="entire-player"></div>
    );
    
};
 
export default Player;