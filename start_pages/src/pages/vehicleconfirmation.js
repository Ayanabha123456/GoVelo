import React from 'react';
import Nav from '../components/hamburg_menu.js';
import Footer from '../components/Footer.js';
import ContentCard from '../components/contentcard.js';
import ContentHeader from '../components/contentheader.js';
import InfoLine from '../components/infoline.js';
import Button from '../components/button.js';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const VehicleConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate()
  let cookies = document.cookie.split("token=")
  let token = cookies[cookies.length - 1].split(";")[0]
  let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  const goBack = () => navigate("/vehiclebook")
  console.log(token)
  const goToConfirmed = () => {
    axios.post("http://127.0.0.1:8000/book/", {
      requestType: "book",
      vehicleID: vehicleID,
      timestamp: date
    }, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(function (response) {
        navigate("/confirmed");
      })
      .catch(function (error) {
        window.alert(error);
      });
  }
  const date = new Date();
  let vehicleType = location.state.vehicle.split(',')[0]
  let vehiclePrice = location.state.vehicle.split(',')[1]
  let vehicleID = location.state.vehicle.split(',')[2] + 'EV'
  console.debug(vehicleType)
  console.debug(vehiclePrice)
  return (
    <div className='vehicleconfirmation' id='outer-container'>
      <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div id='page-wrap'>
        <ContentCard content={<div><ContentHeader title='Vehicles Details' /><br />
          <InfoLine title='Vehicle No.' value={vehicleID} /><br />
          <InfoLine title='Vehicle type' value={vehicleType} /><br />
          <InfoLine title='Pickup location' value={location.state.loc} /><br />
          <Button title='Go Back' handleSubmit={goBack} />
          <Button title='Confirm' handleSubmit={goToConfirmed} /></div>} />
      </div>
    </div>

  )
}

export default VehicleConfirmation;
