import React, { useState, useEffect } from 'react';
import Nav from '../components/hamburg_menu_operator.js';
import Footer from '../components/Footer.js';
import ContentCard from '../components/contentcard.js';
import ContentHeader from '../components/contentheader.js';
import Dropdown from '../components/dropdown.js';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const MovePageFrom = () => {
    const navigate = useNavigate();
    const goToVehicleCount = () => navigate("/vehiclecount", { state: { loc: loc } })
    const [data, setData] = useState([""])
    const [loc, setLoc] = useState()
    const goBack = () => navigate('/operatorlanding')
    const getLocations = async () => {
        await axios
            .get("http://127.0.0.1:8000/book/", { params: { "1": 'get_hub' } })
            .then(function (response) {
                console.log(response.data);
                setData(response.data)
            });
    }
    useEffect(() => {
        getLocations()
    }, []);
    const choose = (e) => {
        console.debug(e.target.value)
        setLoc(e.target.value)
    }
    return (
        <div className='bookpage' id='outer-container'>
            <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id='page-wrap'>
                <ContentCard content={<div><ContentHeader title='Move vehicles from here' />
                    <Dropdown type='location' data={data} title='Pick a location' buttonName='Next' handleClick={goToVehicleCount} onChange={e => choose(e)} goBack={goBack} /></div>} />
            </div>
        </div>

    )
};

export default MovePageFrom;
