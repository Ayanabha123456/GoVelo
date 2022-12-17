import React from 'react';
import Form from './form.js';
import logo from '../images/logo.png';

const StartCard = (props) => {
    const sectionstyle = {
        textAlign: 'center',
        width: '600px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)'
      }
      // return (
      //   <div className='startsection' style={sectionstyle}>
      //     <h1 style={{fontFamily:'"Audiowide",sans-serif',fontSize:'60px'}}>E-Drive</h1>
      //     <Form fields={props.fields} title='Sign In' handleSubmit={props.handleSubmit}/>
      //   </div>
      //   )

      return (
        <div className='startsection' style={sectionstyle}>
          <img style={{height:'100px',width:'100px'}} src={logo} alt="logo"/>
          <p style={{fontFamily:'"Montserrat",serif',fontSize:'30px'}}>Sustainable driving for the future</p>
          {props.children ? props.children : <Form goBack="/" fields={props.fields} handleSubmit={props.handleSubmit} title='Register'/>}
        </div>
        )
}

export default StartCard;
