import React from "react";
import { IconContext } from "react-icons";
import {CiBatteryFull} from "react-icons/ci";

const Battery = () => {
    return(
        <IconContext.Provider value={{ color: "rgb(76,154,42)", className: "global-class-name", size:"90px" }}>
        <div>
            <CiBatteryFull />
        </div>
        </IconContext.Provider>
    )
}
export default Battery;