import React from 'react';
import Nav from '../components/hamburg_menu.js';
import Footer from '../components/Footer.js';
import ContentCard from '../components/contentcard.js';
import ContentHeader from '../components/contentheader.js';
import InfoLine from '../components/infoline.js';
import Button from '../components/button.js';
import { useNavigate, useLocation } from 'react-router-dom';

const Receipt = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const goToLanding = () => navigate('/landing');
    return(
        <div className='receipt' id='outer-container'>
        <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id='page-wrap'>
            <ContentCard content={<div><ContentHeader title="Receipt"/><br/>
            <InfoLine title='Vehicle No.' value={location.state.vehicleID+ 'EV'}/><br/>
            <InfoLine title='Vehicle type' value={location.state.vehicleType}/><br/>
            <InfoLine title='Trip time' value={location.state.tripTimeH + ':' + location.state.tripTimeM + ':' + location.state.tripTimeS}/><br/>
            <InfoLine title='Total charge' value={location.state.price + "£"}/><br/>
            <Button title='OK' handleSubmit={goToLanding}/></div>}/>
        </div>
        </div>
    )
}

export default Receipt;
