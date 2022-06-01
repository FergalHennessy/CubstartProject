import React from 'react';
import './Login.css';

export default function Login(){
    return(
        <div className= "login-wrapper">
        <form>
            <label><p>Username</p>
            <input type="text"/></label>
            <label><p>Password</p>
            <input type="text"/></label>
            <div>
            <button type='submit'>Button
            </button>
            </div>
        </form>
        </div>
    )
}