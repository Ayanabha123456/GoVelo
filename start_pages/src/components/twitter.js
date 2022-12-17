import React from "react";
import { IconContext } from "react-icons";
import {AiFillTwitterCircle} from "react-icons/ai";

const Twitter = () => {
    return(
        <IconContext.Provider value={{ color: "rgb(76,154,42)", className: "global-class-name", size:"50px" }}>
        <div>
            <AiFillTwitterCircle />
        </div>
        </IconContext.Provider>
    )
}
export default Twitter;