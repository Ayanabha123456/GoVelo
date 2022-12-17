import React, { useState, useEffect } from 'react';
import Nav from '../components/hamburg_menu_operator.js';
import Footer from '../components/Footer.js';
import ContentCard from '../components/contentcard.js';
import ContentHeader from '../components/contentheader.js';
import Dropdown from '../components/dropdown.js';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

const MovePageTo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const goBack = () => navigate("/vehiclecount")
    const goToVehicleMoved = () => {
        console.log(location.state.count)
        for (let i = 0; i < location.state.count.length; i++) {
            if (location.state.count[i] > 0) {
                for (let j = 0; j < location.state.count[i]; j++) {
                    console.log(location.state.vehicle[i][2][j], hubs[loc])
                    axios(
                        {
                            method: 'put',
                            url: 'http://127.0.0.1:8000/vehicle/' + location.state.vehicle[i][2][j],
                            data: {
                                hub: hubs[loc]
                            }
                        }
                    )
                }
            }
        }
        navigate("/vehiclemoved")
    }
    const [data, setData] = useState([])
    const [loc, setLoc] = useState()
    const [hubs, setHubs] = useState({})
    const getLocations = async () => {
        await axios
            .get("http://127.0.0.1:8000/book/", { params: { "1": 'get_hub' } })
            .then(function (response) {
                console.log(response.data);
                let check = {}
                for (let i = 0; i < response.data.length; i++) {
                    check[response.data[i]] = i + 1
                }
                setHubs(check)
                let x = response.data.filter(function (e) { return e !== location.state.loc })
                console.log(x)
                setData(x)
            });
    }

    useEffect(() => {
        getLocations()
    }, []);

    const choose = (e) => {
        console.debug(e.target.value)
        setLoc(e.target.value)
    }

    let title = 'Move vehicles to here '
    return (
        <div className='bookpage' id='outer-container'>
            <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id='page-wrap'>
                <ContentCard content={<div><ContentHeader title={title} />
                    <Dropdown type='location' data={data} title='Pick a location' buttonName='Next' handleClick={goToVehicleMoved} onChange={e => choose(e)} goBack={goBack} /></div>} />
            </div>
        </div>

    )
};

export default MovePageTo;
