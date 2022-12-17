import React from "react";
import { IconContext } from "react-icons";
import {AiFillInstagram} from "react-icons/ai";

const Insta = () => {
    return(
        <IconContext.Provider value={{ color: "rgb(76,154,42)", className: "global-class-name", size:"50px" }}>
        <div>
            <AiFillInstagram />
        </div>
        </IconContext.Provider>
    )
}
export default Insta;