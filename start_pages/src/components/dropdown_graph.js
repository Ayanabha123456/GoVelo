import React from 'react';

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
    let options = props.data.map(graph => <option value={graph}>{graph}</option>)
    return (
        <form>
            <label for={props.type} style={labelStyles}>{props.title}</label>
            <select name={props.type} id={props.type} style={selectStyles} onChange={props.onChange}>
                <option value="" selected disabled hidden>Select Graph</option>
                {options}
            </select>
            <br />
        </form>
    )
}

export default Dropdown;