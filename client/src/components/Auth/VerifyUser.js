import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import './VerifyUser.css';



const initialState = { mobileEmail: ''};

const VerifyUser = () => {

    const [ formData, setFormData ] = useState(initialState);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        const response = await fetch((`/user/find/${formData}`), {});

        if(response.status === 200) {
            navigate('/resetPassword', {state:{ user: formData }});
        } else if(response.status === 400) {
            alert("Not a regisered user.");
        } else {
            alert("Oops, something went wrong. Try again after sometime!");
        }

    };

    return(
        <div className='card-fp'>
            <p className="enter">Enter your registered Email/Mobile Number</p>
            <form onSubmit={handleSubmit}>
                <div className="form-fp">
                    <input name='mobileEmail' type="mobileEmail" className="forgot-submit-control" placeholder="Phone number or email" onChange={handleChange} required />
                </div>
                <div className='forgot-submit-div'>
                    <button type="submit" className="forgot-submit-button">Proceed</button>
                </div>
            </form>
        </div>
    );
};

export default VerifyUser;