import React, { useState, useEffect } from 'react';
import Nav from '../components/hamburg_menu.js';
import Footer from '../components/Footer.js';
import ContentCard from '../components/contentcard.js';
import ContentHeader from '../components/contentheader.js';
import InfoLine from '../components/infoline.js';
import Button from '../components/button.js';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function parseJwt(t) {
  if (!t) { return; }
  const base64Url = t.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

const TripBill = () => {
  const navigate = useNavigate();
  const date = new Date();
  const location = useLocation();
  const [price, setPrice] = useState()
  const [trip, setTrip] = useState()
  const [tripTimeM, setTripTimeM] = useState()
  const [tripTimeS, setTripTimeS] = useState()
  const [tripTimeH, setTripTimeH] = useState()
  const [vehicleType, setVehicleType] = useState()
  const [vehicleID, setVehicleID] = useState()
  const goBack = () => navigate("/tripfinish")
  let cookies = document.cookie.split("token=")
  let token = cookies[cookies.length - 1].split(";")[0]
  const goToReceipt = () => {
    axios.post("http://127.0.0.1:8000/book/", {
      requestType: "return",
      return_location: location.state.loc,
      trip_id: trip,
      bill: price
    }, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(function (response) {
        if (response.data === "Success") {
          axios.get("http://127.0.0.1:8000/user/" + parseJwt(token).user_id, {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }).then((res) => {
            axios(
              {
                method: 'put',
                url: 'http://127.0.0.1:8000/wallet/' + res.data.wallet_id.wallet_id,
                data: {
                  amount: res.data.wallet_id.amount - price
                }
              }
            )
            axios.post("http://127.0.0.1:8000/walletactivity/", {
              user_id: parseJwt(token).user_id,
              wallet_id: parseJwt(token).user_id,
              transaction: 1,
              amount: price,
              time: date
            }, {
              headers: {
                'Authorization': 'Bearer ' + token
              }
            })
          })
          navigate('/receipt', { state: { price: price, tripTimeH: tripTimeH, tripTimeM: tripTimeM, tripTimeS: tripTimeS, vehicleType: vehicleType, vehicleID: vehicleID } });
        } else {
          console.log("not enough funds, add link to wallet thing")
          navigate("/pay_error")
        }


      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const loadBill = () => {
    axios.get("http://127.0.0.1:8000/book/", {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(function (response) {
        console.log(token)
        console.log(response.data);
        console.debug(response.data);
        setPrice(response.data[0])
        console.debug(response.data[1])
        let hours = Math.floor(response.data[1] / 3600);
        let time = response.data[1] - hours * 3600;
        let minutes = Math.floor(time / 60);
        let seconds = Math.round(time - minutes * 60);
        console.debug(time)
        console.debug(hours)
        console.debug(minutes)
        console.debug(seconds)
        setTripTimeH(hours)
        setTripTimeM(minutes)
        setTripTimeS(seconds)
        setVehicleType(response.data[2])
        setVehicleID(response.data[3])
        setTrip(response.data[4])
      });
  }
  useEffect(() => {
    loadBill()
  }, []);
  return (
    <div className='tripbill' id='outer-container'>
      <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div id='page-wrap'>
        <ContentCard content={<div><ContentHeader title="Here's your bill" /><br />
          <InfoLine title='Total charge' value={price + "£"} /><br />
          <Button title='Pay' handleSubmit={goToReceipt} />
          <Button title='Cancel' handleSubmit={goBack} /></div>} />
      </div>
    </div>
  )
}

export default TripBill;
