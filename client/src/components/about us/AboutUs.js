import React from 'react';
import './aboutUs.css';


const About = () => {

    const people = [
        {
            name: 'Sanket Jain',
            studentID: '201801010',
            email: '201801010@daiict.ac.in'
        },

        {
            name: 'Rishabh Makwana',
            studentID: '201801090',
            email: '201801090@daiict.ac.in'
        },

        {
            name: 'Devanshu Chicholikar',
            studentID: '201801099',
            email: '201801099@daiict.ac.in'
        }
    ];

    return (
        <div className='entire-about'>
            <p className='heading-about'>About</p>
            {/* <div className="line-about"></div> */}
            <div className='project-div'>
                <p className='project'>Project</p>
                <p className='project-desc'>
                    Prelude is a Music Streaming Service initiated, designed and developed by a team of 3 final year students
                     from DAIICT, Gandhinagar. The service was developed as part of a course project of IT414 Software Project Management 
                    under the guidance of Prof. JayPrakash Lalchandani and TA Ami Pandat.
                    <br /><br/>
                    The service is developed with academic intentions only and not for any commercial purpose. As of now, a user can perform 
                    following actions on Prelude:
                    <ul>
                        <li>Create an account</li>
                        <li>Change password</li>
                        <li>Search a song</li>
                        <li>Play a song (only after logging in)</li>
                        <li>Add a song to his/her favourites (only after logging in)</li>
                        <li>Visit our <a href='/'>GitHub repository</a></li>
                    </ul>
                </p>
            </div>
            <div className='team-div'>
                <p className='team'>Team</p>
                <div className='cover-team'>
                {
                    people.map((person) => (
                        <div className='devs' key={person}>
                            <p className='dev-name'>{person.name}</p>
                            <p className='dev-ID'>{person.studentID}</p>
                        </div>
                    ))
                }
                </div>
            </div>

        </div>
    );
}
 
export default About;