import React, { useState, useEffect } from 'react';
import ContentCard from '../components/contentcardoverflow.js';
import ContentHeader from '../components/contentheader.js';
import { useNavigate } from "react-router-dom";
import Nav from '../components/hamburg_menu_operator.js';
import RepairForm from '../components/repairform.js';
import axios from 'axios';

const RepairVehicle = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [vehicle, setVehicle] = useState([])
    const getVehicles = async () => {
        //get list of all locations from backend
        await axios
            .get("http://127.0.0.1:8000/book/", { params: { "1": 'get_vehicles' } })
            .then(function (response) {
                console.log(response.data);
                // let availableVehicles = []
                // for (let i = 0; i < response.data.length; i++) {
                //     if (response.data[i][3] == 1) {
                //         availableVehicles.push(response.data[i])
                //     }
                // }
                setVehicle(response.data)
            });
    }
    useEffect(() => {
        getVehicles()
    }, []);
    const repair = (e) => {
        for (let i = 0; i < data.length; i++) {
            axios(
                {
                    method: 'put',
                    url: 'http://127.0.0.1:8000/vehicle/' + data[i][0],
                    data: {
                        needs_repair: false,
                        defect: ''
                    }
                }
            )
        }
        navigate("/repaired")
    }
    const goBack = () => navigate("/operatorlanding")
    const changeData = (e) => {
        //get vehicle data from backend based on location
        e.preventDefault()
        let location = e.target.value
        let temp = []
        for (let i = 0; i < vehicle.length; i++) {
            if (vehicle[i][2] && vehicle[i][5] == location) {
                temp.push([vehicle[i][0], vehicle[i][4], vehicle[i][6]])
            }
        }
        setData(temp)
    }
    return (
        <div className='bookpage' id='outer-container'>
            <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id='page-wrap'>
                <ContentCard content={<div><ContentHeader title='Repair all Vehicles' />
                    <RepairForm changeData={changeData} vehicleData={data} type='location' title='Location' buttonname='Repair All' handleClick={repair} goBack={goBack} /></div>} />
            </div>
        </div>
    )
}
export default RepairVehicle;
