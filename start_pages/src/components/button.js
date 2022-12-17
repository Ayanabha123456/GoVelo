import React from 'react';

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
    marginRight:'10px',
    marginLeft:'10px'
  }
  return (
    <button onClick={props.handleSubmit} style={buttonStyles}>{props.title}</button>
  )
}

export default Button;
