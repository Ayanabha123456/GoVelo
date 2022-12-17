import React,{useState,useEffect}from 'react';
import Nav from '../components/hamburg_menu_operator.js';
import ContentCard from '../components/contentcard.js';
import {useNavigate} from "react-router-dom";
import Footer from '../components/Footer.js';
import Button from '../components/button.js';
import {CgTrack} from 'react-icons/cg';
import {BsLightningCharge} from 'react-icons/bs';
import {MdHomeRepairService} from 'react-icons/md';
import {BiTransferAlt} from 'react-icons/bi';
import { IconContext } from "react-icons";

const OperatorLanding = () => {
    const navigate = useNavigate();
    const goToTrackPage = () => navigate("/trackpage")
    const goToChargePage = () => navigate("/chargevehicle")
    const goToRepairPage = () => navigate("/repairvehicle")
    const goToMovePage = () => navigate("/movepagefrom")
    return (
        <div className='bookpage' id='outer-container'>
        <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id='page-wrap' style={{display:'table'}}>
            <ContentCard content={<div>
            <div style={{float:'left'}}>
            <IconContext.Provider value={{ color: "rgb(76,154,42)", className: "global-class-name", size:"90px" }}>
                <CgTrack/>
            </IconContext.Provider>
            <br/>
            <Button title='Track' handleSubmit={goToTrackPage}/>
            </div>
            <div style={{float:'left'}}>
            <IconContext.Provider value={{ color: "rgb(76,154,42)", className: "global-class-name", size:"90px" }}>
            <BsLightningCharge/>
            </IconContext.Provider>
                <br/>
                <Button title='Charge'handleSubmit={goToChargePage}/>
            </div>
            <div style={{float:'left'}}>
            <IconContext.Provider value={{ color: "rgb(76,154,42)", className: "global-class-name", size:"90px" }}>
            <MdHomeRepairService/>
            </IconContext.Provider>
                <br/>
                <Button title='Repair' handleSubmit={goToRepairPage}/>
            </div>
            <div style={{float:'left'}}>
            <IconContext.Provider value={{ color: "rgb(76,154,42)", className: "global-class-name", size:"90px" }}>
                <BiTransferAlt/>
            </IconContext.Provider>
            <br/>
            <Button title='Move' handleSubmit={goToMovePage}/>
            </div>
            
                                    </div>}/>
            <Footer/>
        </div>
        </div>
    )
}

export default OperatorLanding;