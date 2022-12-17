import React,{useState} from 'react';
import Nav from '../components/hamburg_menu.js';
import Footer from '../components/Footer.js';
import ContentCard from '../components/contentcard.js';
import ContentHeader from '../components/contentheader.js';
import TextInput from '../components/textinput.js';
import { useNavigate } from 'react-router-dom';

const ReportVehicle = () => {
    const navigate = useNavigate();
    const [vehicleID, setVehicleID] = useState()
    const goToProblem = () => navigate('/vehicleproblem', {state: {vehicleID: vehicleID}})
    const goBack = () => navigate('/landing')
    const type = (e) => {
      console.debug(e.target.value)
      setVehicleID(e.target.value)
    }
    return (
        <div className='reportvehicle' id='outer-container'>
        <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id='page-wrap'>
            <ContentCard content={<div><ContentHeader title="Report a vehicle"/>
            <TextInput type='vehicle' title='Vehicle no.' buttonName='Next' handleClick={goToProblem} onChange={e => type(e)} goBack={goBack}/></div>}/>
        </div>
        </div>
    )
}

export default ReportVehicle;
