import React from 'react';

const InfoLine = (props) => {
    const infolineStyles = {
        float:'left',
        marginLeft:'20px',
        fontFamily:'"Montserrat",serif',
        fontSize:'20px',
    }
    return (
        <div className='infoLine' style={infolineStyles}>
            <p style={{display:'inline-block'}}><b>{props.title}</b></p>
            <p style={{display:'inline-block',marginLeft:'20px',marginRight:'10px'}}>{props.value}</p>
        </div>
    )
}

export default InfoLine;