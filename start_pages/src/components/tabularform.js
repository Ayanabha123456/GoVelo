import React from 'react';
import Button from './button.js';

const TableForm = (props) => {
    const tableStyles = {
        margin:'auto',
        fontFamily:'"Montserrat",serif',
        fontSize:'13px'
    }

    let tableRows = props.vehicleData.map(vehicle =><tr>
                                                        <td style={{padding:'15px'}}><input type="radio" id={vehicle[0]} name={props.selectiontype} value={vehicle} onChange={props.onChange}/></td>
                                                        <td style={{padding:'15px'}}><label for={vehicle[0]}>{vehicle[0]}</label></td>
                                                        <td style={{padding:'15px'}}><p>{vehicle[1]}</p></td>
                                                    </tr>)
    return(
        <div>
            <form>
                <table style={tableStyles}>
                <thead style={{borderBottom:'2px solid rgb(76,154,42)'}}>
                    <tr>
                    <th style={{padding:'15px',borderBottom:'2px solid rgb(76,154,42)',borderTop:'2px solid rgb(76,154,42)'}}>Choose</th>
                    <th style={{padding:'15px',borderBottom:'2px solid rgb(76,154,42)',borderTop:'2px solid rgb(76,154,42)'}}>Vehicle-type</th>
                    <th style={{padding:'15px',borderBottom:'2px solid rgb(76,154,42)',borderTop:'2px solid rgb(76,154,42)'}}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
                </table>
                <Button title='Go Back' handleSubmit={props.goBack}/>
                <Button title={props.buttonname} handleSubmit={props.handleClick}/>
                
            </form>

        </div>
    )
}

export default TableForm;
