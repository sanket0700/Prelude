import { React, useState } from 'react';
import { ReactComponent as LS2 } from '../../images/spotify.svg';
import { useNavigate } from 'react-router-dom';


import './Login.css';



const initialState = { mobileEmail: '', password:'' };

const Login = () => {

    const [ formData, setFormData ] = useState(initialState);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(('/user/login'), {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json()

        if(data.token) {
            localStorage.getItem('token');
            localStorage.setItem('token', data.token);
            navigate('/home');
        } else{
            alert("Invalid credentials!");
        }

    };

    return(
        <div className='card'>
        <form onSubmit={handleSubmit}>
            <div className="form">
                <div className="form-group">
                    <input name='mobileEmail' type="mobileEmail" className="form-control" placeholder="Phone number or email" onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <input name='password' type="password" className="form-control" placeholder="Password" onChange={handleChange} required />
                </div>
            </div>

            <p className="forgot-password">
                <a href="/verifyUser">Forgot password?</a>
            </p>

            <div className='login-div'>
                <button type="submit" className="login-button">Log In</button>
            </div>

            <div className="separator">
                <div className="line1"></div>
                <h2>OR</h2>
                <div className="line2"></div>
            </div>
        </form>

        <div className='login-spotify'>
            <LS2 />
            <p>Log in with Spotify</p>
        </div>

        <div className='signup'>
            <p id="p1">Don't have an account?</p>
            <a href='/signup' id='p2'>Sign up</a>
        </div>

      </div>
    );
};

export default Login;