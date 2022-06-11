import React, {useState} from 'react';
import PropTypes, { string } from 'prop-types';
import './Login.scss';
import express from 'express';

async function loginUser(credentials) {

    

    return fetch('http://localhost:8080/api/login',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }).then((data) => data.json());
}




export default function Login({ setToken }){
    const [username, setUserName] = useState<string>();
    const [password, setPassword] = useState<string>();

    const handleSubmit = async e => {                       //what to do on submit?
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
        console.log(token);                                 //what is our current token
    }

    return(
        <div className= "login-wrapper">
        <form onSubmit = {handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text" onChange = {e => setUserName(e.target.value)}/></label>
            <label><p>Password</p>
            <input type="text" onChange={e => setPassword(e.target.value)}/></label>
            <div>
            <button type='submit'>Button
            </button>
            </div>
        </form>
        </div>
    )
}

Login.propTypes = {
    setToken : PropTypes.func.isRequired
}