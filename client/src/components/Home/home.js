import jwt from 'jsonwebtoken';
import React from 'react';

import './home.css';



const Home = () => {

    const sections = ["My Library", "All Songs", "All Artists"];

    const token = localStorage.getItem('token');
    const user = jwt.decode(token);
    if(!user){
        localStorage.removeItem('token');
        window.location.href = "/";
    }

    return(
        <div className='entire-home'>
            {sections.map((title) => (
                <a href={title.split(" ")[0]+"-"+title.split(" ")[1]} key={title}>
                    <div className='card-home'>
                        <p className='first'>{title.split(" ")[0]}</p>
                        <p className='second'>{title.split(" ")[1]}</p>
                        <div className="line-home"></div>
                        <p className='explore'>EXPLORE</p>
                    </div>
                </a>
            ))}
        </div>
    );

};

export default Home;