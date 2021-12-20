import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import logo from '../../images/Logo (short).jpg';
import './navbar.css';


const Navbar = () => {

    const location = useLocation();
    let [ user, setUser] = useState(null);

    const isCurrentURL = (url) => {
        return location.pathname.toLowerCase() === url.toLowerCase();
    }

    let token = localStorage.getItem('token');

    useEffect(() => {
        setUser(jwt.decode(token))
    }, [token]);

    const logout = () => {
        localStorage.getItem('token');
        localStorage.removeItem('token');
        console.log("Logout Successful");
    };

    return (
        <nav className="navbar">
            { (!isCurrentURL('/') && !isCurrentURL('/signup')) ? 
                <a href={user ? "/home" : "/"}>
                    <div className="logo">
                        <img src={logo} alt="Prelude" width="66.537" height="60"/>
                    </div>
                </a> : null
            }
            <div className="links">
                <a href="/about">About</a>
                {/* <a href="/contact">Contact Us</a> */}
                { user ? 
                    <a onClick={logout} href="/">Log out</a> : null 
                }
            </div>
        </nav>
    );
}
 
export default Navbar;