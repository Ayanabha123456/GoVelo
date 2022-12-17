import React, { useEffect, useState } from 'react';
import Nav from '../components/hamburg_menu.js';
import ContentCard from '../components/contentcard.js';
import ContentHeader from '../components/contentheader.js';
import InfoLine from '../components/infoline.js';
import Button from '../components/button.js';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


const VehicleConfirmationQR = () => {
    let cookies = document.cookie.split("token=")
    let token = cookies[cookies.length - 1].split(";")[0]
    const [vehicle, setVehicle] = useState({
        vehicle_type: "Check",
        hub: "No"
    })
    const date = new Date();
    const navigate = useNavigate()
    const location = useLocation()
    const goToConfirmed = () => {
        console.log(vehicle)
        axios.post("http://127.0.0.1:8000/book/", {
            requestType: "book",
            vehicleID: vehicle.vehicle_id + "EV",
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
                console.log(error);
            });
    }

    const getVehicle = async () => {
        await axios.get("http://127.0.0.1:8000/vehicle/" + location.state.data, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            setVehicle(response.data)
        })
    }

    useEffect(() => {
        getVehicle()
    }, [])

    const goBack = () => navigate("/qrbook")
    return (
        <div className='vehicleconfirmation' id='outer-container'>
            <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id='page-wrap'>
                <ContentCard content={<div><ContentHeader title='Vehicles Details' /><br />
                    <InfoLine title='Vehicle No.' value={location.state.data + 'EV'} /><br />
                    <InfoLine title='Vehicle type' value={vehicle.vehicle_type.name} /><br />
                    <InfoLine title='Pickup location' value={vehicle.hub.hub_loc} /><br />
                    <Button title='Go Back' handleSubmit={goBack} />
                    <Button title='Confirm' handleSubmit={goToConfirmed} />
                </div>} />
            </div>
        </div>

    )
}

export default VehicleConfirmationQR;
