import React from 'react';
import Button from './button.js';

const TableForm = (props) => {
    const tableStyles = {
        margin: 'auto',
        fontFamily: '"Montserrat",serif'

    }

    let tableRows = props.vehicleData.map((vehicle, index) => <tr>
        <td style={{ padding: '15px' }}><label for={vehicle[0]}>{vehicle[0]}</label></td>
        <td style={{ padding: '15px' }}><input type="number" id={vehicle[0]} quantity={vehicle[0]} min="0" max={vehicle[2].length} value={props.value[index]} onChange={(e) => props.onChange(e, index)} /></td>
    </tr>)
    return (
        <div>
            <form>
                <table style={tableStyles}>
                    <thead style={{ borderBottom: '2px solid rgb(76,154,42)' }}>
                        <tr>
                            <th style={{ padding: '15px', borderBottom: '2px solid rgb(76,154,42)', borderTop: '2px solid rgb(76,154,42)' }}>Vehicle-type</th>
                            <th style={{ padding: '15px', borderBottom: '2px solid rgb(76,154,42)', borderTop: '2px solid rgb(76,154,42)' }}>Count</th>
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
