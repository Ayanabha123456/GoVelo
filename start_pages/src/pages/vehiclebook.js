import React, { useState, useEffect } from 'react';
import Nav from '../components/hamburg_menu.js';
import Footer from '../components/Footer.js';
import ContentCard from '../components/contentcardoverflow.js';
import ContentHeader from '../components/contentheader.js';
import TableForm from '../components/tabularform.js';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const VehicleBookpage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const goToVehicleCheckout = () => navigate("/vehicleconfirm", {state: {loc: location.state.loc, vehicle: vehicle}})
    const [vehicleData, setData] = useState([])
    const [vehicle, setVehicle] = useState([])
    const goBack = () => navigate("/bookpage")
    console.debug("YOoooô", location.state.loc)
    const choose = (e) => {
      console.debug(e.target.value)
      setVehicle(e.target.value)
    }
    const getVehicles = async () => {
        //get list of all locations from backend
        await axios
        .get("http://127.0.0.1:8000/book/", { params: { "1":'get_vehicles_types', "2": location.state.loc} })
        .then(function (response) {
          console.log(response.data);
          setData(response.data)
        });
    }
    useEffect (() => {
        getVehicles()
    },[]);
    return (
        <div className='vehiclebook' id='outer-container'>
        <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /><br/>
        <div id='page-wrap'>

            <ContentCard content={
              <div>
                <ContentHeader title='Vehicles at Glasgow'/>
                <TableForm selectiontype='vehicle' vehicleData={vehicleData} buttonname='Next' handleClick={goToVehicleCheckout} onChange={e => choose(e)} goBack={goBack}/>
              </div>
            }/>
        </div>

        </div>

  )
};

export default VehicleBookpage;
