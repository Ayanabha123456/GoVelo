import React, { useState, useEffect } from 'react';
import Nav from '../components/hamburg_menu_manager.js';
import Footer from '../components/Footer.js';
import ContentCard from '../components/contentcard.js';
import ContentHeader from '../components/contentheader.js';
import Dropdown from '../components/dropdown_graph.js';
import GraphSpace from '../components/graph_space.js';
import axios from 'axios';

const Manager = () => {
    const [data, setData] = useState([""])
    const [graph, setGraph] = useState()
    const getGraphs = () => {
        //get graph data from backend
        return ["Fare per trip", "Current Vehicle Status", "Hub Revenue", "Revenue by Vehicle Type", "Hub Activity (Number of trips to and from each hub)", "Bike type popularity"]
    }
    const fetchGraphs = () => {
        axios.get("http://127.0.0.1:8000/graphs/")
    }
    useEffect(() => {
        let graphs = getGraphs()
        setData((arr) => graphs)
        fetchGraphs()
    }, []);
    const onGraphChange = (e) => {
        setGraph(e.target.value)
    }
    return (
        <div className='bookpage' id='outer-container'>
            <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id='page-wrap'>
                <ContentCard content={<div><ContentHeader title='Visualize Graph' />
                    <Dropdown type='graph' data={data} title='Pick a graph' buttonName='Next' onChange={e => onGraphChange(e)} />
                    <GraphSpace type={graph} /></div>} />

            </div>
        </div>
    )
}

export default Manager;
