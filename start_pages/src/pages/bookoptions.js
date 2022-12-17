import React,{useState,useEffect}from 'react';
import Nav from '../components/hamburg_menu.js';
import ContentCard from '../components/contentcard.js';
import {useNavigate} from "react-router-dom";
import Button from '../components/button.js';
import {IoIosHand} from 'react-icons/io';
import {FaQrcode} from 'react-icons/fa';
import { IconContext } from "react-icons";

const BookOptions = () => {
    const navigate = useNavigate();
    const goToBookPage = () => navigate("/bookpage")
    const goToQRBookPage = () => navigate("/qrbook")
    const goBack = () => navigate("/landing")

    return (
        <div className='bookpage' id='outer-container'>
        <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id='page-wrap'>
            <ContentCard content={<div style={{display:'table'}}>
            <div style={{float:'left'}}>
            <IconContext.Provider value={{ color: "rgb(76,154,42)", className: "global-class-name", size:"90px" }}>
                <IoIosHand/>
            </IconContext.Provider>
            <br/>
            <Button title='Manual' handleSubmit={goToBookPage}/>
            </div>
            <div style={{float:'left'}}>
            <IconContext.Provider value={{ color: "rgb(76,154,42)", className: "global-class-name", size:"90px" }}>
            <FaQrcode/>
            </IconContext.Provider>
                <br/>
                <Button title='QR-Scan' handleSubmit={goToQRBookPage}/>
            </div>
            <br/>
            <hr></hr>
            <Button title='Go Back' handleSubmit={goBack}/>
                                    </div>}/>
        </div>
        </div>
    )
}

export default BookOptions;