import React,{useState,useEffect} from 'react';
import Nav from '../components/hamburg_menu.js';
import Footer from '../components/Footer.js';
import ContentCard from '../components/contentcard.js';
import ContentHeader from '../components/contentheader.js';
import Dropdown from '../components/dropdown.js';
import axios from 'axios';
import {useNavigate, useLocation} from "react-router-dom";

const TripFinish = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const goToTripBill = () => navigate("/tripbill", {state: {loc: loc}})
    const goBack = () => navigate("/landing")
    const [data, setData] = useState([""])
    const [loc, setLoc] = useState()
    const getLocations = async () => {
        //get list of all locations from backend
        await axios
        .get("http://127.0.0.1:8000/book/", { params: { "1":'get_hub' } })
        .then(function (response) {
          console.log(response.data);
          setData(response.data)
        });
    }
    useEffect (() => {
        getLocations()
    },[]);
    const choose = (e) => {
      console.debug(e.target.value)
      setLoc(e.target.value)
    }
    return (
        <div className='finishtrip' id='outer-container'>
        <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id='page-wrap'>
            <ContentCard content={<div><ContentHeader title='Finishing Trip'/>
                                    <Dropdown type='location' data={data} title='Pick a location' buttonName='Next' handleClick={goToTripBill} onChange={e => choose(e)} goBack={goBack}/></div>}/>
        </div>
        </div>

    )
  };

  export default TripFinish;
