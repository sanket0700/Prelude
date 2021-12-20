import React, { useState } from 'react';
import { ReactComponent as LS2 } from '../../images/spotify.svg';
import { useNavigate } from 'react-router-dom';

import './Signup.css'




const initialState = { mobileEmail: '', fullName:'', password:'' };

const Signup = () => {

    const [ formData, setFormData ] = useState(initialState);
    const navigate = useNavigate();

    const verifyField = (value) => {
        const email = /\S+@\S+\.\S+/;
        const phoneno = /^\d+$/;
        if( email.test(value) || ((phoneno.test(value) && value.length === 10)) ){   
            return true;
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e) {

        e.preventDefault();

        if (!verifyField(formData['mobileEmail'])) {
            alert('Enter a valid Email or Phone Number');
        }

        else{

            const data = await fetch(('/user/signup'), {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if(data.status === 200){
                navigate('/');
            } else{
                alert("Oops, an error occured! Try again after sometime!");
                navigate('/signup');
            }

        }
    }

    return(
        <div className='card'>
            <div className='signup-spotify'>
                <LS2 />
                <p>Log in with Spotify</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="separator-signup">
                    <div className="line1-signup"></div>
                    <h2>OR</h2>
                    <div className="line2-signup"></div>
                </div>
                <div className="form-signup">
                    <div className="form-signup-group">
                        <input name='mobileEmail' type="text" className="form-control" placeholder="Phone number or email" onChange={handleChange} required />
                    </div>

                    <div className="form-signup-group">
                        <input name='fullName' type="text" className="form-control" placeholder="Full Name" onChange={handleChange} required />
                    </div>

                    <div className="form-signup-group">
                        <input name='password' type="password" className="form-control" placeholder="Password" onChange={handleChange} required />
                    </div>
                </div>

                <div className='signup-div'>
                    <button type="submit" className="signup-button">Sign Up</button>
                </div>
            </form>

            <div className='statement'>
                <p id="p">By signing up, you agree to our <a href='#top'><b>Terms</b></a>, <a href='#top'><b>Data Policy</b></a> and <a href='#top'><b>Cookies Policy</b></a>.</p>
            </div>

            <div className='login'>
                <p id="p1-s">Have an account?</p>
                <a href='/' id='p2-s'>Log In</a>
            </div>

        </div>
    );
};

export default Signup;