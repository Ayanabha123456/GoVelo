import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import StartCard from '../components/startcard.js';
import axios from "axios";

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setConfirmPassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [mobile, setMobile] = useState('');
  const updateName = (e) => {
    setUsername(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value)
  }

  const updateCPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const updatefirstName = (e) => {
    setfirstName(e.target.value)
  }

  const updatelastName = (e) => {
    setlastName(e.target.value)
  }

  const updateMobile = (e) => {
    setMobile(e.target.value)
  }


  const register_user = () => {
    axios.post('http://localhost:8000/register/', { firstName: firstName, lastName: lastName, password: password, email: username }).then(console.log(JSON.stringify(firstName)))
      .then(function (response) {
        navigate("/signin");
      })
  }

  const fields = [['Firstname', 'text', updatefirstName], ['Lastname', 'text', updatelastName], ['Email', 'email', updateName], ['Password', 'password', updatePassword], ['Confirm Password', 'password', updateCPassword], ['Mobile', 'tel', updateMobile]]
  const navigate = useNavigate();
  const goToLanding = () => navigate("/landing")
  return (
    <>
      <StartCard fields={fields} handleSubmit={register_user}/>
    </>
  )
};

export default RegisterPage;
