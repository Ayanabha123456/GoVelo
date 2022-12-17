import React from 'react'

export default function WalletActivity(props) {
    const tableStyles = {
        margin: 'auto',
        fontFamily: '"Montserrat",serif'
    }

    let tableRows = null

    if (props.activity) {
        tableRows = props.activity.map(activity => <tr>
            <td style={{ padding: '15px' }}><p>{new Date(activity.time).toDateString()}</p></td>
            <td style={{ padding: '15px' }}><p>{activity.transaction ? 'Debit' : 'Credit'}</p></td>
            <td style={{ padding: '15px' }}><p><span>£</span>{activity.amount}</p></td>
        </tr>)
    }
    return (
        <table style={tableStyles}>
            <thead style={{ borderBottom: '2px solid rgb(76,154,42)' }}>
                <tr>
                    <th style={{ padding: '15px', borderBottom: '2px solid rgb(76,154,42)', borderTop: '2px solid rgb(76,154,42)' }}>Date</th>
                    <th style={{ padding: '15px', borderBottom: '2px solid rgb(76,154,42)', borderTop: '2px solid rgb(76,154,42)' }}>Credit/Debit</th>
                    <th style={{ padding: '15px', borderBottom: '2px solid rgb(76,154,42)', borderTop: '2px solid rgb(76,154,42)' }}>Amount</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    )
}
