import React from 'react'
import Button from '../components/button';

export default function UserTripActivity(props) {
    const tableStyles = {
        margin: 'auto',
        fontFamily: '"Montserrat",serif'
    }

    let tableRows = null

    if (props.trips) {
        tableRows = props.trips.map(trip => {
            let start = new Date(trip.start_time)
            let end = new Date(trip.end_time)
            let diff = (end - start)
            var minutes = Math.round(((diff % 86400000) % 3600000) / 60000); // minutes
            let seconds = end.getSeconds() - start.getSeconds()
            return (<tr>
                <td style={{ padding: '15px' }}><p>{new Date(trip.start_time).toDateString()}</p></td>
                <td style={{ padding: '15px' }}><p>{trip.start_loc.hub_loc}</p></td>
                <td style={{ padding: '15px' }}><p>{trip.end_loc.hub_loc}</p></td>
                <td style={{ padding: '15px' }}><p>{`${minutes} Min`}</p></td>
                <td style={{ padding: '15px' }}><p>{trip.vehicle_id.vehicle_type.name}</p></td>
                <td style={{ padding: '15px' }}><p><span>£</span>{trip.fare}</p></td>
            </tr>)
        })
    }
    return (
        <>
            <table style={tableStyles}>
                <thead style={{ borderBottom: '2px solid rgb(76,154,42)' }}>
                    <tr>
                        <th style={{ padding: '15px', borderBottom: '2px solid rgb(76,154,42)', borderTop: '2px solid rgb(76,154,42)' }}>Date</th>
                        <th style={{ padding: '15px', borderBottom: '2px solid rgb(76,154,42)', borderTop: '2px solid rgb(76,154,42)' }}>Start Hub</th>
                        <th style={{ padding: '15px', borderBottom: '2px solid rgb(76,154,42)', borderTop: '2px solid rgb(76,154,42)' }}>End Hub</th>
                        <th style={{ padding: '15px', borderBottom: '2px solid rgb(76,154,42)', borderTop: '2px solid rgb(76,154,42)' }}>Duration</th>
                        <th style={{ padding: '15px', borderBottom: '2px solid rgb(76,154,42)', borderTop: '2px solid rgb(76,154,42)' }}>Vehicle Type</th>
                        <th style={{ padding: '15px', borderBottom: '2px solid rgb(76,154,42)', borderTop: '2px solid rgb(76,154,42)' }}>Fare</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
            <Button title="Go Back" handleSubmit={props.handleClick} />
        </>

    )
}
