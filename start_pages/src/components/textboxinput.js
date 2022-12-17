import React from 'react';
import Button from './button';

const TextboxInput = (props) => {
    const labelStyles = {
        fontFamily: '"Montserrat",serif',
        fontSize:'25px',
        float:'left',
        paddingLeft:'30px',
        paddingBottom:'10px'
      }
    return (
        <form>
            <label for={props.type} style={labelStyles}>{props.title}</label><br/>
            <textarea id={props.type} name={props.type} rows="4" cols="50" {...props}></textarea><br/>
            <Button title='Go Back' handleSubmit={props.goBack}/>
            <Button title={props.buttonName} handleSubmit={props.handleClick}/>
        </form>
    )
}

export default TextboxInput;
