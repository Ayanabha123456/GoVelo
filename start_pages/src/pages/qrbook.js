import React, { useState, useEffect } from 'react';
import Nav from '../components/hamburg_menu.js';
import ContentCard from '../components/contentcardoverflow.js';
import ContentHeader from '../components/contentheader.js';
import QRCode from '../components/qrcode.js';
import Button from '../components/button.js';
import { useNavigate } from 'react-router-dom';

const QRBook = () => {
    const navigate = useNavigate()
    const goBack = () => navigate("/bookoptions")
    return (
        <div className='bookpage' id='outer-container'>
            <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id='page-wrap'>
                <ContentCard content={<div><ContentHeader title='Scan to book vehicle' />
                    <QRCode goTo="/vehicleconfirmqr" />
                    <Button title="Go Back" handleSubmit={goBack} /></div>} />
            </div>
        </div>
    )
}

export default QRBook;