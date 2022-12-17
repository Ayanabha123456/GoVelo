import React from 'react';

const ContactLine = (props) => {
    const infolineStyles = {
        float:'left',
        marginLeft:'20px',
        fontFamily:'"Montserrat",serif',
        fontSize:'20px',
    }
    return (
        <div className='infoLine' style={infolineStyles}>
            <div style={{display:'inline-block'}}><props.image/></div>
            <p style={{display:'inline-block',marginLeft:'40px',marginBottom:'30px',float:'right'}}>{props.value}</p>
        </div>
    )
}

export default ContactLine;