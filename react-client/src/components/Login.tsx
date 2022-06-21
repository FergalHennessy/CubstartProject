import React, { useState, useEffect, useRef } from 'react';
import PropTypes, { string } from 'prop-types';
import './Login.scss';
import express from 'express';
import e from 'express';


//what to do on login request? => get from database this is very insecure or whatever haha
async function loginUser(credentials) {

  return fetch('http://localhost:8080/api/login', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => {
    console.log ("WHAT IS DATA: " +  data)
    return data.json()
  });
}

//what to do on new user request?
async function newUser(input){
  return fetch('http://localhost:8080/users/add',{
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body:JSON.stringify(input)
  }).then((data) => data.json());
}

let flag = 0;

export default function Login({ setToken }) {
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>(null);
  const [reqUsername, setReqUsername] = useState<string>()
  const [reqPassword, setReqPassword] = useState<string>()
  const [reqPassword2, setReqPassword2] = useState<string>()
  const [reqEmail, setReqEmail] = useState<string>()
  const ref = useRef({panelTwo: 0, panelOne: 0, panelFlag: 0});


  const [panelOneSaved, setPanelOneSaved] = useState(0);
  const [panelTwoSaved, setPanelTwoSaved] = useState(0);
  const [panelFlag, setpanelFlag] = useState(0);

  const inputDOM = useRef();


  const handleSubmit = async e => {                       //what to do on submit?
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
    console.log("TOKEN: " +token.username + " " + token.password);                                 //what is our current token
  }


  //feed new user object to the database
  const handleUserSubmit = async e => {
    e.preventDefault();
    console.log("got to part1 of userSubmit")
    if(reqPassword !== reqPassword2){
      return;
    }
    const userData = await newUser({
      "username": reqUsername,
      "password": reqPassword,
      "email": reqEmail,
      "privilege": "awaitingConfirmation"
    });
    console.log("USERDATA: " + userData.username + " password: " + userData.password + " email: " + userData.email);
  }



  useEffect(()=>{
    var panelOne = document.getElementsByClassName('form-panel two')[0].clientHeight,
    panelTwo = document.getElementsByClassName('form-panel two')[0].scrollHeight;
    console.log("PANELTWO: " + panelTwo);

    setPanelTwoSaved(panelTwo);
    setPanelOneSaved(panelOne);

    console.log("REF CURRENT PANELTWO: " + panelOneSaved + "  " + panelTwoSaved);
    
    let restingForms = [].filter.call(document.getElementsByClassName('form-panel two'), el => !(el.className.indexOf('active') >= 0));

    console.log("restingForm: " + restingForms[0]);

    for(let neededElement of (restingForms as HTMLCollectionOf<HTMLElement>)){
      neededElement.addEventListener('click', function(e){
        e.preventDefault();
        document.getElementsByClassName('form-toggle')[0].classList.add('visible');
        console.log("CLICKED OPEN AND " + document.getElementsByClassName('form-toggle')[0].classList);
        document.getElementsByClassName('form-panel one')[0].classList.add('hidden');
        document.getElementsByClassName('form-panel two')[0].classList.add('active');
        (document.getElementsByClassName('form') as HTMLCollectionOf<HTMLElement>)[0].style.height = panelTwo.toString();
        
        setpanelFlag(1);
      })
    }

    let formToggle = document.getElementsByClassName('form-toggle')[0];

      formToggle.addEventListener('click', function(e){
        e.preventDefault();        formToggle.classList.remove('visible');
        console.log("CLICKED SHUT AND " + document.getElementsByClassName('form-toggle')[0].classList);
        document.getElementsByClassName('form-panel one')[0].classList.remove('hidden');
        document.getElementsByClassName('form-panel two')[0].classList.remove('active');
        (document.getElementsByClassName('form') as HTMLCollectionOf<HTMLElement>)[0].style.height = panelOne.toString();

        setpanelFlag(0);
      })

      console.log(document.getElementsByClassName('form')[0].clientHeight)
  
}, [])

  function handleTwo(){
    console.log("two pressed!");
  }


  
  return (
    <>
      {/* Form*/}
      <div className="form" style={{height: panelFlag? panelTwoSaved: panelOneSaved}}>
        <div className={"form-toggle"} /> {/*changed from original*/}
        <div className={"form-panel one"}> {/*changed from original*/}
          <div className="form-header">
            <h1>Account Login</h1>
          </div>
          <div className="form-content">
            <form onSubmit={handleSubmit}>  {/* handleSubmit passed down from parent: it is a hook to update the sessionStorage of our client*/}
              <div className="form-group">
                <label htmlFor="username">Username</label>
                {/* change occurs to username field => hook out to logintsx username variable and update the frame*/}
                <input
                  type="text"
                  id="usernameTWO"
                  name="username"
                  required={true}
                  onChange={e => setUserName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                {/* change occurs to username field => hook out to logintsx password variable and update the frame*/}
                <input
                  type="password"
                  id="passwordTWO"
                  name="password"
                  required={true}
                  onChange={e => setPassword(e.target.value)}
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
        <div className={"form-panel two"} onClick={handleTwo}> {/*changed from original*/}
          <div className="form-header">
            <h1>Register Account</h1>
          </div>
          <div className="form-content">
            <form onSubmit = {(e)=>{handleUserSubmit(e) && console.log("the form that actually submitted")}}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required={true}
                  onChange={e => setReqUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required={true}
                  onChange={e => setReqPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  ref={inputDOM}
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  required={true}
                  onChange={e => setReqPassword2(e.target.value)}
                  onInvalid={()=> this.setCustomValidity('Enter User Name Here')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required={true}
                onChange = {e => setReqEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <button type="submit" onClick = {handleUserSubmit}>Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="pen-footer">
        <a
          href="https://github.com/FergalHennessy/CubstartProject"
          target="_blank"
        >
          ↩ View this project on Github
        </a>
        <a
          href="https://discord.gg/JHqBspTMDR"
          target="_blank"
        >
          Join my Discord! ↪
        </a>
      </div>

    </>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
