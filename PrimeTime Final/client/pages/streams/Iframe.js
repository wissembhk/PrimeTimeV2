import React, { useState, Fragment, useEffect } from 'react';

import axios from 'axios';



const JoinScreen = ({ className, title, subTitle, fluid }) => {
    

const [role,setRole]=useState('') ;
const [expiration,setExpiration]=useState();
const today= new Date(Date.now()).toISOString();

              useEffect(() => {
                setRole(JSON.parse(localStorage.getItem('user')).role);
                setExpiration(JSON.parse(localStorage.getItem('user')).expiration)
                document.body.style.setProperty('--primary', '#10266b')
                document.body.style.setProperty('--secondary', '#464545')
                document.body.style.setProperty('--light', '#1F357D')
                document.body.style.setProperty('--dark', '#04185B')
                if ((role=="musician") &&(today<expiration))
                document.getElementById("showskill").src =
                "http://localhost:3001/react-rtc-demo?streamerName="+JSON.parse(localStorage.getItem('user')).firstName+" "+
                JSON.parse(localStorage.getItem('user')).lastName+"&meetId=create&streamerId="+JSON.parse(localStorage.getItem('user'))._id;
                
              }
             )
if ((role=="musician") &&(today<expiration))
return (
    
    <iframe id='showskill' height="720" width="1400" title="Iframe Example" allow="camera; microphone;display-capture;autoplay; clipboard-write;" frameBorder="0"></iframe>
    
);
else 
return <div>you can't start a stream upgrade your account.</div>

};

export default JoinScreen;