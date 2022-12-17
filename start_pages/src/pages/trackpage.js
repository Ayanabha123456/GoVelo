import React, { useState, useEffect } from 'react';
import ContentCard from '../components/contentcardoverflow.js';
import ContentHeader from '../components/contentheader.js';
import { useNavigate } from "react-router-dom";
import OperatorActionForm from '../components/operatoractionform.js';
import Nav from '../components/hamburg_menu_operator.js';
import axios from 'axios';

const Trackpage = () => {
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState([])
    const getVehicles = async () => {
        //get list of all locations from backend
        await axios
            .get("http://127.0.0.1:8000/book/", { params: { "1": 'get_vehicles' } })
            .then(function (response) {
                console.log(response.data);
                setVehicle(response.data)
            });
    }
    useEffect(() => {
        getVehicles()
    }, []);
    const [data, setData] = useState([])
    const goBack = () => navigate("/operatorlanding")
    const changeData = (e) => {
        //get vehicle data from backend based on status
        e.preventDefault()
        let status = e.target.value
        if (status === 'En route') {
            let temp = []
            for (let i = 0; i < vehicle.length; i++) {
                if (vehicle[i][3] == 0) {
                    temp.push([vehicle[i][0], vehicle[i][4], vehicle[i][5]])
                }
            }
            setData(temp)
        }
        else if (status === 'Charge required') {
            let temp = []
            for (let i = 0; i < vehicle.length; i++) {
                if (vehicle[i][1] < 50) {
                    temp.push([vehicle[i][0], vehicle[i][4], vehicle[i][5]])
                }
            }
            setData(temp)

        }
        else if (status === 'Repair Required') {
            let temp = []
            for (let i = 0; i < vehicle.length; i++) {
                if (vehicle[i][2]) {
                    temp.push([vehicle[i][0], vehicle[i][4], vehicle[i][5]])
                }
            }
            setData(temp)
        }
        else if (status === 'Available') {
            let temp = []
            for (let i = 0; i < vehicle.length; i++) {
                if (vehicle[i][3] == 1 && !vehicle[i][2] && vehicle[i][1] > 50) {
                    temp.push([vehicle[i][0], vehicle[i][4], vehicle[i][5]])
                }
            }
            setData(temp)
        }
    }
    return (
        <div className='bookpage' id='outer-container'>
            <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id='page-wrap'>
                <ContentCard content={<div><ContentHeader title='Track all vehicles' />
                    <OperatorActionForm changeData={changeData} vehicleData={data} type='status' title='Status' buttonname='Go Back' handleClick={goBack} /></div>} />
            </div>
        </div>
    )
}

export default Trackpage;
