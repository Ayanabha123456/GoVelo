import React from 'react';
import Nav from '../components/hamburg_menu_operator';
import Footer from '../components/Footer.js';
import ContentCard from '../components/contentcard.js';
import ContentHeader from '../components/contentheader.js';
import {useNavigate} from "react-router-dom";
import Button from '../components/button.js';
import NoMoney from '../components/nomoney';

const PaymentError = () => {
    const navigate = useNavigate();
    const goBack = () => navigate('/wallet')
    return (
        <div className='bookpage' id='outer-container'>
        <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id='page-wrap'>
            <ContentCard content={<div><ContentHeader title='No balance in your wallet'/>
                                        <NoMoney/>
                                        <Button title="Go to Wallet" handleSubmit={goBack}/></div>}/>
            
        </div>
        </div>
    )
}

export default PaymentError;