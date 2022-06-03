import React from 'react';
import './Login.css';

type Props = {
    setToken: (token:number) => void
  }

export default function Login(props : Props){
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