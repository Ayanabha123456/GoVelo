import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StartCard from '../components/startcard.js';

const Button = (props) => {
  const buttonStyles = {
    width: '150px',
    height: '50px',
    marginTop: '20px',
    fontSize: '20px',
    backgroundColor: 'rgb(76,154,42)',
    border: 'none',
    color: 'white',
    borderRadius: '2px',
    cursor: 'pointer',
    marginBottom: '20px',
    marginLeft: '10px'
  }
  return (
    <input type='submit' style={buttonStyles} value={props.title} {...props} />
  )
}

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [_continue, setContinue] = useState();
  var cookies = document.cookie.split("token=")
  var token = cookies[cookies.length - 1].split(";")[0]
  const Navigate = useNavigate();
  const goBack = () => Navigate("/")
  const updateName = (e) => {
    setUsername(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value)
  }

  const signIn = async () => {
    let payload = { email: username, password: password }

    await axios.post('http://localhost:8000/token/', { email: username, password: password }).then(console.log(JSON.stringify(payload)))
      .then(function (response) {
        setContinue("smthg")
        console.log(response.data.access);
        if (username.split('@')[1] == 'operator.velo.org') {
          document.cookie = "role=operator"
        }
        else if (username.split('@')[1] == 'manager.velo.org') {
          document.cookie = "role=manager"
        }
        else {
          document.cookie = "role=user"
        }
        document.cookie = "token=" + response.data.access;
        document.cookie = "refresh=" + response.data.refresh;
        cookies = document.cookie.split("token=")
        token = cookies[cookies.length - 1].split(";")[0]
        console.log(token)
      })
      .catch(function (error) {
        console.log(token);
        console.log("Cant log in");
        alert("Wrong Password or Username");
      });
    console.log(document.cookie)
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    if (document.cookie.includes("role=user") && token) {
      Navigate("/landing");
    }
    else if (document.cookie.includes("role=operator") && token) {
      Navigate("/operatorlanding");
    }
    else if (document.cookie.includes("role=manager") && token) {
      Navigate("/manager");
    }
  }


  const signinStyles = {
    margin: 'auto',
    textAlign: 'center',
    boxShadow: '1px 1px 3px 3px rgb(76,154,42)',
    width: '500px'
  }
  const labelStyles = {
    fontFamily: '"Montserrat",serif',
    fontSize: '25px',
    float: 'left',
    paddingLeft: '20px'
  }

  return (
    <>
      <StartCard>
        <div className='signinCard' style={signinStyles}>
          <div className='email' style={{ paddingTop: '20px' }}>
            <label for="email" style={labelStyles}>Email</label>
            <input style={{ height: '30px' }} type="email" id="email" name="email" required onChange={updateName} /><br />
          </div>
          <div className='password' style={{ paddingTop: '20px' }}>
            <label for="password" style={labelStyles}>Password</label>
            <input style={{ height: '30px', marginRight: '43px' }} type="password" id="password" name="password" required onChange={updatePassword} /><br />
          </div>
          <Button title='Go Back' onClick={goBack} />
          <Button title='Sign In' onClick={signIn} />
        </div>
      </StartCard>
    </>
  )
};

export default SignInPage;
