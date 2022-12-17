import React, { useState, useEffect } from 'react';
import Nav from '../components/hamburg_menu_operator.js';
import Footer from '../components/Footer.js';
import ContentCard from '../components/contentcard.js';
import ContentHeader from '../components/contentheader.js';
import { useNavigate, useLocation } from "react-router-dom";
import TableForm from '../components/vehicleavailable.js';
import axios from 'axios';

const VehicleCount = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const goToDropHub = () => navigate("/movepageto", { state: { loc: location.state.loc, count: countData, vehicle: vehicleData } })
    const [vehicleData, setVehicleData] = useState([])
    const [countData, setCountData] = useState([])
    const goBack = () => navigate("/movepagefrom")
    const getVehicles = async () => {
        //get list of all locations from backend
        await axios
            .get("http://127.0.0.1:8000/book/", { params: { "1": 'get_vehicle_to_move', "2": location.state.loc } })
            .then(function (response) {
                console.log(response.data);
                setVehicleData(response.data)
            });
    }
    useEffect(() => {
        getVehicles()
        let copy = []
        for (let i = 0; i < vehicleData.length; i++) {
            copy.append(0)
        }
        setCountData(copy)
    }, []);

    const updateCount = (e, i) => {
        let copy = countData
        copy[i] = e.target.value
        setCountData(copy)
    }

    const title = "Choose vehicles from " + location.state.loc + " to move";
    return (
        <div className='bookpage' id='outer-container'>
            <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id='page-wrap'>
                <ContentCard content={<div><ContentHeader title={title} />
                    <TableForm selectiontype='vehicle' vehicleData={vehicleData} buttonname='Next' handleClick={goToDropHub} onChange={updateCount} value={countData} goBack={goBack} /></div>} />
            </div>
        </div>
    )
}
export default VehicleCount;
