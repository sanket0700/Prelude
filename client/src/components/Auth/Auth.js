import { useLocation } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import Login from './Login'
import Signup from './Signup'

import './Auth.css';
import { ReactComponent as Text } from '../../images/Text.svg';


const Auth = () => {

    const location = useLocation();
    let [ user, setUser ] = useState(null);

    localStorage.getItem('token');
    let token = localStorage.getItem('token');

    useEffect(() => {
        setUser(jwt.decode(token));
        if(user!=null) {
            window.location.href = '/home';
        }
    }, [token, user]);

    const isCurrentURL = (url) => {
        return location.pathname.toLowerCase() === url.toLowerCase();
    }

    return (
        <div className="entire">  
                <div className='text' style={{height:'20px',
                width: '20px'}}>
                    <Text />
                </div>
                { isCurrentURL('/') ?
                    <Login /> : <Signup />
                }
        </div>
    );
};
 
export default Auth;