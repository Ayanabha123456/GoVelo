import React from "react";
import { IconContext } from "react-icons";
import {AiOutlineMail} from "react-icons/ai";

const Email = () => {
    return(
        <IconContext.Provider value={{ color: "rgb(76,154,42)", className: "global-class-name", size:"50px" }}>
        <div>
            <AiOutlineMail />
        </div>
        </IconContext.Provider>
    )
}
export default Email;