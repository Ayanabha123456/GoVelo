import React,{useState,useEffect} from 'react';
import Nav from '../components/hamburg_menu.js';
import Footer from '../components/Footer.js';
import ContentCard from '../components/contentcardoverflow.js';
import ContentHeader from '../components/contentheader.js';
import TableForm from '../components/tabularform.js';
import { useNavigate } from 'react-router-dom';


const Test = () => {
    const navigate = useNavigate();
    const goToVehicleCheckout = () => navigate("/vehicleconfirm")
    const goBack = () => navigate("/bookpage")
    const [vehicleData, setVehicleData] = useState([""])
    const getVehicles = () => {
        //get list of all vehicles from backend
        return [['Penny-farting','6.5£/hour'],['Tandem-bike','7£/hour'],['x','6£/hour'],['x','6£/hour'],['x','6£/hour'],['x','6£/hour'],['x','6£/hour'],['x','6£/hour'],['x','6£/hour'],['x','6£/hour'],['x','6£/hour'],['x','6£/hour'],['x','6£/hour'],['x','6£/hour']]
    }
    useEffect (() => {
        let vehicles = getVehicles()
        setVehicleData((arr)=> vehicles)
    },[]);
    return (
        <div>
        <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} /><br/>
        
        <ContentCard content={<div>
            <ContentHeader title='Vehicles at Glasgow'/>
                                <TableForm selectiontype='vehicle' vehicleData={vehicleData} buttonname='Next' handleClick={goToVehicleCheckout} goBack={goBack}/>
                                        </div>}/>
        </div>
        
    )
  };
    
  export default Test;
