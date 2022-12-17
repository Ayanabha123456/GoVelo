import React from 'react';
import Button from './button';

const TextInput = (props) => {
    const labelStyles = {
        fontFamily: '"Montserrat",serif',
        fontSize:'25px',
        float:'left',
        marginLeft:'20px',
      }
      const selectStyles = {
        marginLeft:'20px',
        width:'150px',
        height:'30px',
        marginRight:'20px'
    }
    return (
        <form>
            <label for={props.type} style={labelStyles}>{props.title}</label>
            <input type="text" id={props.type} name={props.type} style={selectStyles} {...props}/>
            <br/>
            <Button title='Go Back' handleSubmit={props.goBack}/>
            <Button title={props.buttonName} handleSubmit={props.handleClick}/>
        </form>
    )
}

export default TextInput;
