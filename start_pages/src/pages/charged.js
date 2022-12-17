import React from 'react';
import Nav from '../components/hamburg_menu_operator';
import Footer from '../components/Footer.js';
import ContentCard from '../components/contentcard.js';
import ContentHeader from '../components/contentheader.js';
import {useNavigate} from "react-router-dom";
import Button from '../components/button.js';
import Battery from '../components/battery.js';

const Charged = () => {
    const navigate = useNavigate();
    const goBack = () => navigate('/operatorlanding')
    return (
        <div className='bookpage' id='outer-container'>
        <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id='page-wrap'>
            <ContentCard content={<div><ContentHeader title='All vehicles charged'/>
                                        <Battery/>
                                        <Button title="Home" handleSubmit={goBack}/></div>}/>
        </div>
        </div>
    )
}

export default Charged;