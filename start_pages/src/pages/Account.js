import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import UserActivity from "./UserActivity";
import ContentCard from '../components/contentcardoverflow.js';
import Nav from '../components/hamburg_menu.js';
import ContentHeader from '../components/contentheader.js';

const Account = () => {
    const [trips, setTrips] = useState([])
    const [user, setUser] = useState([])
    const navigate = useNavigate();
    const goBack = () => navigate("/landing")

    let cookies = document.cookie.split("token=")
    let token = cookies[cookies.length - 1].split(";")[0]

    function parseJwt(t) {
        if (!t) { return; }
        const base64Url = t.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    const fetchTrips = () => {
        axios.get("http://127.0.0.1:8000/trips/").then((response) => {
            let allTrips = response.data
            let userTrips = []
            for (let i = 0; i < allTrips.length; i++) {
                if (allTrips[i].user_id == parseJwt(token).user_id) {
                    userTrips.push(allTrips[i])
                }
            }
            console.log(userTrips)
            setTrips(userTrips)
        })
    }

    useEffect(() => {
        fetchTrips()
    }, [])

    return (
        <div className='bookpage' id='outer-container'>
            <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id='page-wrap'>
                <ContentCard content={<div><ContentHeader title='Your Trip History' />
                    <UserActivity trips={trips} handleClick={goBack} /></div>} />
            </div>
        </div>
    )
}

export default Account
