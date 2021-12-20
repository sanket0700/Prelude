import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import './App.css';
import './components/Auth/Auth.css'
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Home from './components/Home/home';
import Songs from './components/songs/allSongs';
import Artists from './components/artists/allArtists';
import Library from './components/library/home';
import About from './components/about us/AboutUs';
import Contact from './components/library/home';
import Player from './components/player/player';
import VerifyUser from './components/Auth/VerifyUser';
import ResetPassword from './components/Auth/ResetPassword';


const App = () => {
    return(
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Auth />} />
                <Route path="/verifyUser" exact element={<VerifyUser />} />
                <Route path="/resetPassword" exact element={<ResetPassword />} />
                <Route path="/signup" exact element={<Auth />} />
                <Route path="/home" exact element={<Home />} />
                <Route path="/All-Songs" exact element={<Songs />}/>
                <Route path="/All-Artists" exact element={<Artists />}/>
                <Route path="/My-Library" exact element={<Library />}/>
                <Route path="/about" exact element={<About />}/>
                <Route path="/contact" exact element={<Contact />}/>
                <Route path="/play" exact element={<Player />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;