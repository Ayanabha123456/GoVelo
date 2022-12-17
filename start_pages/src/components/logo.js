import React from 'react';
import logo from '../images/logo.png';

const Logo = () => {
    const hStyles = {
        float:'right',marginRight:'20px',marginTop:'5px',
        height:'50px',width:'50px'
    }
    return(
    <img style={hStyles} src={logo} alt="logo"/>
    )
}

export default Logo;