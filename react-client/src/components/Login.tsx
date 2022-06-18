import React, { useState, useEffect, useRef } from 'react';
import PropTypes, { string } from 'prop-types';
import './Login.scss';
import express from 'express';
import e from 'express';


//what to do on login request?
async function loginUser(credentials) {

  return fetch('http://localhost:8080/api/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

//what to do on new user request?
async function newUser(input){
  return fetch('http://localhost:8080/api/newUser',{
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body:JSON.stringify(input)
  }).then((data) => data.json());
}

//TODO : TRANSLATE JQUERY TO JAVASCRIPT

let flag = 0;

export default function Login({ setToken }) {
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>(null);
  const ref = useRef({panelTwo: 0, panelOne: 0, panelFlag: 0});

  //MANUALLY TRANSLATED JQUERY ANIMATIONS BEGIN HERE

  let panelOneVisible = true;
  let panelTwoVisible = false;
  let formToggleVisible = false;


  const handleSubmit = async e => {                       //what to do on submit?
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
    console.log("TOKEN: " +token.username + " " + token.password);                                 //what is our current token
  }


  //broken obviously
  const handleUserSubmit = async e => {
    e.preventDefault();
    const userData = await newUser({
      username,
      password
    });
    console.log("USERDATA: " + userData.username + "password: " + userData.password);
  }



  useEffect(()=>{
    var panelOne = document.getElementsByClassName('form-panel two')[0].clientHeight,
    panelTwo = document.getElementsByClassName('form-panel two')[0].scrollHeight;
    console.log("PANELTWO: " + panelTwo);

    ref.current.panelTwo = panelTwo;
    ref.current.panelOne = panelOne;
    
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
        
        ref.current.panelFlag = 1;
      })
    }

    let formToggle = document.getElementsByClassName('form-toggle')[0];

      formToggle.addEventListener('click', function(e){
        e.preventDefault();        formToggle.classList.remove('visible');
        console.log("CLICKED SHUT AND " + document.getElementsByClassName('form-toggle')[0].classList);
        document.getElementsByClassName('form-panel one')[0].classList.remove('hidden');
        document.getElementsByClassName('form-panel two')[0].classList.remove('active');
        (document.getElementsByClassName('form') as HTMLCollectionOf<HTMLElement>)[0].style.height = panelOne.toString();

        ref.current.panelFlag = 0;
      })

      console.log(document.getElementsByClassName('form')[0].clientHeight)
  
}, [])

  function handleTwo(){
    console.log("two pressed!");
  }

  return (
    <>
      {/* Form*/}
      <div className="form" style={{height: ref.current.panelFlag? ref.current.panelTwo: ref.current.panelOne}}>
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
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required={true}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required={true}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  required={true}
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
          //href="https://www.behance.net/gallery/30478397/Login-Form-UI-Library"
          target="_blank"
        >
          <i className="material-icons">arrow_backward</i>View on Behance
        </a>
        <a
          //href="https://github.com/andyhqtran/UI-Library/tree/master/Login%20Form"
          target="_blank"
        >
          View on Github<i className="material-icons">arrow_forward</i>
        </a>
      </div>

    </>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
