import React, { useState, useEffect } from 'react';
import Button from './button';
import axios from 'axios';

const ChargeForm = (props) => {
    const [data, setData] = useState([])
    const getLocation = async () => {
        //get list of all locations from backend
        await axios
            .get("http://127.0.0.1:8000/book/", { params: { "1": 'get_hub' } })
            .then(function (response) {
                console.log(response.data);
                setData(response.data)
            });
    }
    useEffect(() => {
        getLocation()
    }, []);
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

    let options = data.map(location => <option value={location}>{location}</option>)
    return (
        <form>
            <label for={props.type} style={labelStyles}>{props.title}</label>
            <select name={props.type} id={props.type} style={selectStyles} onChange={props.changeData}>
                <option value="" selected disabled hidden>Select Location</option>
                {options}
            </select>

            {
                props.vehicleData.length > 0 ?
                    <>
                        <table style={tableStyles}>
                            <thead style={{ borderBottom: '2px solid rgb(76,154,42)' }}>
                                <tr>
                                    <th style={{ padding: '15px', borderBottom: '2px solid rgb(76,154,42)', borderTop: '2px solid rgb(76,154,42)' }}>Vehicle Id</th>
                                    <th style={{ padding: '15px', borderBottom: '2px solid rgb(76,154,42)', borderTop: '2px solid rgb(76,154,42)' }}>Vehicle-type</th>
                                    <th style={{ padding: '15px', borderBottom: '2px solid rgb(76,154,42)', borderTop: '2px solid rgb(76,154,42)' }}>Current Charge</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows}
                            </tbody>
                        </table>
                        <Button title="Go Back" handleSubmit={props.goBack} />
                        <Button title={props.buttonname} handleSubmit={props.handleClick} />
                    </>
                    :
                    <>
                        <p>All Vehicles Charged</p>
                        <Button title="Go Back" handleSubmit={props.goBack} />
                    </>
            }
        </form>
    )
}

export default ChargeForm;
