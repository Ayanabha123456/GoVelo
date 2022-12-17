import React from 'react';
import Nav from '../components/hamburg_menu.js';
import Footer from '../components/Footer.js';
import ContentCard from '../components/contentcard.js';
import ContentHeader from '../components/contentheader.js';
import {useNavigate} from "react-router-dom";
import Button from '../components/button.js';
import TickMark from '../components/tickmark.js';

const Confirmed = () => {
    const navigate = useNavigate();
    const goBack = () => navigate('/landing')
    return (
        <div className='bookpage' id='outer-container'>
        <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id='page-wrap'>
            <ContentCard content={<div><ContentHeader title='Your booking has been confirmed'/>
                                        <TickMark/>
                                        <Button title="Home" handleSubmit={goBack}/></div>}/>
        </div>
        </div>
    )
}

export default Confirmed;