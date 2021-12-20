import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


import './ResetPassword.css';



const initialState = { password: ''};

const ResetPassword = () => {

    const [ formData, setFormData ] = useState(initialState);
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch((`/user/changePassword/${location.state.user}`), {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if(response.status === 200) {
            alert("Password changed successfully")
            navigate('/');
        } else {
            alert("Oops, something went wrong. Try again after sometime!");
        }

    };

    return(
        <div className='card-fp'>
            <p className="enter">Enter your new password</p>
            <form onSubmit={handleSubmit}>
                <div className="form-fp">
                    <input name='password' className="forgot-submit-control" placeholder="Enter your new password" onChange={handleChange} required />
                </div>
                <div className='forgot-submit-div'>
                    <button type="submit" className="forgot-submit-button">Reset</button>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;