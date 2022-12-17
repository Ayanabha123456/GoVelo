import React from 'react';

const ContentHeader = (props) => {
    const headerStyles = {
        fontFamily: 'Ubuntu',
        marginLeft: '20px',
        fontSize: '40px',
        marginRight: '20px',
        color: 'rgb(76,154,42)',
        textAlign:'center'
    }
    return (
        <h1 style={headerStyles}>{props.title}</h1>
    )
}

export default ContentHeader;