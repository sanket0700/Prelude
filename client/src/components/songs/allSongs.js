import React from "react";
import { useState } from "react";
import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import './allSongs.css';


const Songs = (props) => {

    const token = localStorage.getItem('token');
    const user = jwt.decode(token);
    
    if(!user){
        localStorage.removeItem('token');
        window.location.href = "/";
    }

    const [ songs, setSongs ] = useState([]);
    const [ flag, setFlag ] = useState(true);
    const navigate = useNavigate();
    const [ liked, setLiked ] = useState([""]);
    const [ flag2, setFlag2 ] = useState(true);
    const [ searchTerm, setSearchTerm ] = useState("");


    async function getSongs() {
        let items = await fetch(('/allSongs'), {});

        if (items.status === 200) {
            console.log("retreived all the song metadata successfully!");
        } else{
            alert("Try again later!");
        }

        return items;

    }


    async function getLiked() {
        let likedData = await fetch((`/user/liked/${user.email}`), {});
        if (likedData.status !== 200){
            console.log("Error retreiving user data");
        } else{
            console.log("Hurray");
        }
        return likedData;
    }


    async function sendLikedUpdate() {
        await fetch((`/user/updateLiked/${user.email}`), {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                liked: liked
            })
        });
    }

    
    if(flag) {
        getSongs()
            .then( async (res) => {
                const data = await res.json();
                data.songs.sort((a, b) => {
                    let fa = a.name.toLowerCase(),
                        fb = b.name.toLowerCase();
                
                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                });
                setSongs(data.songs);
                setFlag(false);
            })
            .catch((error) => {
                console.log(error);
            });        
    }


    if(flag2) {
        getLiked()
            .then( async (res) => {
                const data = await res.json();
                setLiked(data.liked);
                setFlag2(false);
            })
            .catch((error) => {
                console.log(error);
            });        
    }



    const handleClick = (e) => {
        const forLiked = liked.includes(e.target.getAttribute('name'));
        navigate('/play', { state: { 
            reference: e.target.getAttribute('name'),
            cover: e.target.getAttribute('cover'),
            liked: forLiked,
            name: e.target.getAttribute('songname'),
            artistName: e.target.getAttribute('artistname')
        } });
    }

    const likeToggle = (e) => {

        if(liked.includes(e.target.getAttribute('name'))){
            liked.splice(liked.indexOf(e.target.getAttribute('name')));
        }

        else{
            liked.push(e.target.getAttribute('name'));
        }
        setLiked(liked);
        sendLikedUpdate();
    }



    return (
        <div className="all-songs">
            <link rel="stylesheet"></link>
            <div style={{display: "flex"}}>
                <p className="heading-allsongs">All Songs</p>
                <input className="search-song" type="text" placeholder="Search a song by name" onChange={(e) => {setSearchTerm(e.target.value)}}/>
            </div>
            <div className="list-of-songs">
                {songs.filter((val) => {
                    if (searchTerm === "") {
                        return val;
                    } else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val;
                    }
                    return null;
                }).map((song, index) => (
                    <div key={index} style={{display: 'flex'}}>
                    <div onClick={handleClick} key={index} name={song.reference} cover={song.cover} songname={song.name} artistname={song.artist}>
                        <div className="song-row" name={song.reference} cover={song.cover} songname={song.name} artistname={song.artist}>
                            <img src={`/cover-art/${song.cover}`} alt={song.name + " by " + song.artist} className="song-cover-art" name={song.reference} cover={song.cover} songname={song.name} artistname={song.artist}/>
                            <p className="song-name" name={song.reference} cover={song.cover} songname={song.name} artistname={song.artist}>{song.name}</p>
                            <p className="song-artist-name" name={song.reference} cover={song.cover} songname={song.name} artistname={song.artist}>{song.artist}</p>
                        </div>
                        
                    </div>
                    <div className="like-all" onClick={likeToggle} name={song.reference}>
                        { liked.includes(song.reference) ? 
                        <FormControlLabel id="like-icon-all"
                            control={<Checkbox checkedIcon={<FavoriteBorder style={{fill: "white", width: "20", height: "20"}}/>} 
                                    icon={<Favorite style={{fill: "red", width: "20", height: "20"}}/> }
                            name={song.reference} />}
                        />
                        :
                        <FormControlLabel id="like-icon-all"
                            control={<Checkbox icon={<FavoriteBorder style={{fill: "white", width: "20", height: "20"}}/>} 
                                    checkedIcon={<Favorite style={{fill: "red", width: "20", height: "20"}}/> }
                            name={song.reference} />}
                        />
                        }
                    </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
 
export default Songs;