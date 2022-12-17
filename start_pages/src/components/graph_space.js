import React from 'react';
import Graph1 from './graph1';
import Graph2 from './graph2';

const GraphSpace = (props) => {
    const type = props.type
    if (type === "Fare per trip") {
        return (
            <div className='graph'>
                <Graph1 type={"line"} />
            </div>
        )
    }
    else if (type === "Current Vehicle Status") {
        return (
            <div className='graph'>
                <Graph1 type={"pie"} />
            </div>
        )
    }
    else if (type === "Hub Revenue") {
        return (
            <div className='graph'>
                <Graph2 graph={"hub_bar_All_hubs.png"} />
            </div>
        )
    }
    else if (type === "Revenue by Vehicle Type") {
        return (
            <div className='graph'>
                <Graph1 type={"hub_bar"} />
            </div>
        )
    }
    else if (type === "Hub Activity (Number of trips to and from each hub)") {
        return (
            <div className='graph'>
                <Graph2 graph={"hub_bar_total_counts_All_types.png"} />
            </div>
        )
    }
    else if (type === "Bike type popularity") {
        return (
            <div className='graph'>
                <Graph2 graph={"pie_most_pop_types.png"} />
            </div>
        )
    }
    else {
        return (
            <p>Select a Graph</p>
        )
    }

}

export default GraphSpace;
