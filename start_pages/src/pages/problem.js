import React,{useState} from 'react';
import Nav from '../components/hamburg_menu.js';
import Footer from '../components/Footer.js';
import ContentCard from '../components/contentcard.js';
import ContentHeader from '../components/contentheader.js';
import TextboxInput from '../components/textboxinput.js';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const Problem = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let cookies = document.cookie.split("token=")
    let token = cookies[cookies.length - 1].split(";")[0]
    const [vehicleID, setVehicleID] = useState()
    const [vehicleProblem, setVehicleProblem] = useState()
    const goBack = () => navigate('/reportvehicle')
    const goToDefectSubmit = () =>{
      axios(
          {
              method: 'put',
              url: 'http://127.0.0.1:8000/vehicle/' + location.state.vehicleID,
              data: {
                  defect: vehicleProblem,
                  needs_repair: 1
              }
          }
      )
      navigate('/defectsubmit');
    }

    const type = (e) => {
      console.debug(e.target.value)
      setVehicleProblem(e.target.value)
    }
    return (
        <div className='vehicleproblem' id='outer-container'>
        <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id='page-wrap'>
            <ContentCard content={<div><ContentHeader title="Describe your problem"/><br/>
            <TextboxInput type='problem' title='Comment' buttonName='Confirm' handleClick={goToDefectSubmit} onChange={e => type(e)} goBack={goBack}/></div>}/>
        </div>
        </div>
    )
}

export default Problem;
