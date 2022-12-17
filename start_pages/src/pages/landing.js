import React, { useState, useEffect } from 'react';
import Nav from '../components/hamburg_menu.js';
import ContentCard from '../components/contentcard.js';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer.js';
import Button from '../components/button.js';
import { FaBiking } from 'react-icons/fa';
import { GiReturnArrow } from 'react-icons/gi';
import { MdReport } from 'react-icons/md';
import { IconContext } from "react-icons";
import checkToken from '../components/check_token.js'
import newAccessToken from '../components/new_access_token.js'
import axios from 'axios';

const Landing = () => {
  const navigate = useNavigate();
  const goToBookOptions = () => navigate("/bookoptions")
  const goToReturnPage = () => navigate("/tripfinish")
  const goToReportPage = () => navigate("/reportvehicle")
  const [trip, setTrip] = useState()
  const [_return, setReturn] = useState()
  const [tokenState, setTokenState] = useState()
  let cookies = document.cookie.split("token=")
  let token = cookies[cookies.length - 1].split(";")[0]
  let cookies1 = document.cookie.split("refresh=")
  let refresh_token = cookies1[cookies1.length - 1].split(";")[0]
  console.log(refresh_token)
  const checkActiveTrip = () => {
    axios.get("http://127.0.0.1:8000/trip/", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(function (response) {
        console.log(response.data)
        setTrip(response.data[0])
        setReturn(response.data[1])
      });
  }
  useEffect(() => {
    let config = { "token": token }
    checkToken(config, (res) => {
      setTokenState('true')
      console.log("yup, tokens fine")
      checkActiveTrip()
    }, (err) => {
      setTokenState('false')
      console.log("nope, token is expired")
      let config1 = { "refresh": refresh_token }
      console.log(refresh_token)
      newAccessToken(config1, (res) => {
        setTokenState('true')

        console.log("yup, got a new token")
        console.log(res)
        document.cookie = "token=" + res.data.access;
      }, (err) => {
        setTokenState('false')
        console.log("some error")

      });
    });
  }, []);
  return (
    <div className='bookpage' id='outer-container'>
      <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div id='page-wrap'>
        <ContentCard content={<div style={{ display: 'table' }}>
          {trip && <div style={{ float: 'left' }}>
            <IconContext.Provider value={{ color: "rgb(76,154,42)", className: "global-class-name", size: "90px" }}>
              <FaBiking />
            </IconContext.Provider>
            <br />
            {trip && <Button title='Book' handleSubmit={goToBookOptions} />}
          </div>}
          {_return && <div style={{ float: 'left' }}>
            <IconContext.Provider value={{ color: "rgb(76,154,42)", className: "global-class-name", size: "90px" }}>
              <GiReturnArrow />
            </IconContext.Provider>
            <br />
            <Button title='Return' handleSubmit={goToReturnPage} />
          </div>}
          <div style={{ float: 'left' }}>
            <IconContext.Provider value={{ color: "rgb(76,154,42)", className: "global-class-name", size: "90px" }}>
              <MdReport />
            </IconContext.Provider>
            <br />
            <Button title='Report' handleSubmit={goToReportPage} />
          </div>

        </div>} />
      </div>
    </div>
  )
}

export default Landing;
