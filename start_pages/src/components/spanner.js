import React from "react";
import { IconContext } from "react-icons";
import {TiSpanner} from "react-icons/ti";

const Spanner = () => {
    return(
        <IconContext.Provider value={{ color: "rgb(76,154,42)", className: "global-class-name", size:"90px" }}>
        <div>
            <TiSpanner />
        </div>
        </IconContext.Provider>
    )
}
export default Spanner;