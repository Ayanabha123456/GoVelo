import React from 'react';
import Button from './button';

const OperatorActionForm = (props) => {
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
    const tableStyles = {
        margin: 'auto',
        fontFamily: '"Montserrat",serif'

    }
    let tableRows = props.vehicleData.map(vehicle => <tr>
        <td style={{ padding: '15px' }}><p>{vehicle[0]}EV</p></td>
        <td style={{ padding: '15px' }}><p>{vehicle[1]}</p></td>
        <td style={{ padding: '15px' }}><p>{vehicle[2]}</p></td>
    </tr>)
    return (
        <form>
            <label for={props.type} style={labelStyles}>{props.title}</label>
            <select name={props.type} id={props.type} style={selectStyles} onChange={props.changeData}>
                <option value="" selected disabled hidden>Select Status</option>
                <option value="Charge required">Charge required</option>
                <option value="En route">En route</option>
                <option value="Repair Required">Repair Required</option>
                <option value="Available">Available</option>
            </select>
            <table style={tableStyles}>
                <thead style={{ borderBottom: '2px solid rgb(76,154,42)' }}>
                    <tr>
                        <th style={{ padding: '15px', borderBottom: '2px solid rgb(76,154,42)', borderTop: '2px solid rgb(76,154,42)' }}>Vehicle Id</th>
                        <th style={{ padding: '15px', borderBottom: '2px solid rgb(76,154,42)', borderTop: '2px solid rgb(76,154,42)' }}>Vehicle-type</th>
                        <th style={{ padding: '15px', borderBottom: '2px solid rgb(76,154,42)', borderTop: '2px solid rgb(76,154,42)' }}>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
            <Button title={props.buttonname} handleSubmit={props.handleClick} />
        </form>
    )
}

export default OperatorActionForm;
