import React from 'react';
import {useNavigate} from "react-router-dom"
import logo from '../images/logo.png';

const Button = (props) => {
    const buttonStyles = {
      marginRight:'30px',
      marginLeft: 'auto',
      width:'150px',
      height:'50px',
      fontSize:'20px',
      backgroundColor:'rgb(76,154,42)',
      border:'none',
      color:'white',
      borderRadius:'2px',
      cursor:'pointer'
    }
    return(
    <button onClick={props.handleClick} style={buttonStyles}>{props.title}</button>
    )
}

  const StartCard = (props) => {
    const sectionstyle = {
      textAlign: 'center',
      width: '600px',
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)'
    }
    return(
    <div className='startsection' style={sectionstyle}>
      <img style={{height:'100px',width:'100px'}} src={logo} alt="logo"/>
      <p style={{fontFamily:'"Montserrat",serif',fontSize:'30px'}}>Sustainable driving for the future</p>
      <div className='btn' style={{display:'inline-block'}}>
        <Button title='Sign In' handleClick={props.handleSignClick}/>
        <Button title='Register' handleClick={props.handleRegisterClick}/>
      </div>
    </div>
    )
  }

const Home = () => {
    const navigate = useNavigate();
    const goToSignIn = () => navigate("/signin")
    const goToRegister = () => navigate("/register")
    document.cookie = "token=" + "";
    document.cookie = "refresh=" + "";
    return (
        <>
          <StartCard handleSignClick={goToSignIn} handleRegisterClick={goToRegister}/>
        </>
    )
  };

  export default Home;
