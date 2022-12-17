import React from 'react';
import Button from './button.js';

const Dropdown = (props) => {
    const labelStyles = {
        fontFamily: '"Montserrat",serif',
        fontSize: '25px',
        float: 'left',
        paddingLeft: '20px',
    }
    const selectStyles = {
        marginLeft: '20px',
        width: '200px',
        height: '30px',
        marginRight: '20px'
    }
    let options = props.data.map(location => <option value={location}>{location}</option>)
    return (
        <form>
            <label for={props.type} style={labelStyles}>{props.title}</label>
            <select name={props.type} id={props.type} style={selectStyles} {...props}>
                <option value="" selected disabled hidden>Select Location</option>
                {options}
            </select>
            <br/>
            <Button title={props.buttonName} handleSubmit={props.handleClick}/>
            <Button title="Go Back" handleSubmit={props.goBack}/>
        </form>
    )
}

export default Dropdown;
