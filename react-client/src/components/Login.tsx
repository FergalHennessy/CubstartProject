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

    let panelOne = document.getElementsByClassName('form-panel two')[0].clientHeight;
    
    /*return(
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
    )}*/
    return(
        <>

  {/* Form*/}
  <div className="form">
    <div className="form-toggle" />
    <div className="form-panel one">
      <div className="form-header">
        <h1>Account Login</h1>
      </div>
      <div className="form-content">
        <form onSubmit = {handleSubmit}>  {/* handleSubmit passed down from parent: it is a hook to update the sessionStorage of our client*/}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            {/* change occurs to username field => hook out to logintsx username variable and update the frame*/}
            <input
              type="text"
              id="username"
              name="username"
              required={true}
              onChange = {e => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            {/* change occurs to username field => hook out to logintsx password variable and update the frame*/}
            <input
              type="password"
              id="password"
              name="password"
              required={true}
              onChange = {e => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-remember">
              <input type="checkbox" />
              Remember Me
            </label>
            <a className="form-recovery" href="#">
              Forgot Password?
            </a>
          </div>
          <div className="form-group">
            <button type="submit">Log In</button>
          </div>
        </form>
      </div>
    </div>
    <div className="form-panel two">
      <div className="form-header">
        <h1>Register Account</h1>
      </div>
      <div className="form-content">
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required = {true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required= {true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              required= {true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" required={true} />
          </div>
          <div className="form-group">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div className="pen-footer">
    <a
      href="https://www.behance.net/gallery/30478397/Login-Form-UI-Library"
      target="_blank"
    >
      <i className="material-icons">arrow_backward</i>View on Behance
    </a>
    <a
      href="https://github.com/andyhqtran/UI-Library/tree/master/Login%20Form"
      target="_blank"
    >
      View on Github<i className="material-icons">arrow_forward</i>
    </a>
  </div>
  
</>
    )}

Login.propTypes = {
    setToken : PropTypes.func.isRequired
}
/*
$(document).ready(function() {
    var panelOne = $('.form-panel.two').height(),
      panelTwo = $('.form-panel.two')[0].scrollHeight;
  
    $('.form-panel.two').not('.form-panel.two.active').on('click', function(e) {
      e.preventDefault();
  
      $('.form-toggle').addClass('visible');
      $('.form-panel.one').addClass('hidden');
      $('.form-panel.two').addClass('active');
      $('.form').animate({
        'height': panelTwo
      }, 200);
    });
  
    $('.form-toggle').on('click', function(e) {
      e.preventDefault();
      $(this).removeClass('visible');
      $('.form-panel.one').removeClass('hidden');
      $('.form-panel.two').removeClass('active');
      $('.form').animate({
        'height': panelOne
      }, 200);
    });
  });

*/