import React from "react";
import { IconContext } from "react-icons";
import {AiFillCheckCircle} from "react-icons/ai";

const TickMark = () => {
    return(
        <IconContext.Provider value={{ color: "rgb(76,154,42)", className: "global-class-name", size:"90px" }}>
        <div>
            <AiFillCheckCircle />
        </div>
        </IconContext.Provider>
    )
}
export default TickMark;