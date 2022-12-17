import React from "react";
import { IconContext } from "react-icons";
import {MdMoneyOff} from "react-icons/md";

const NoMoney = () => {
    return(
        <IconContext.Provider value={{ color: "rgb(76,154,42)", className: "global-class-name", size:"90px" }}>
        <div>
            <MdMoneyOff />
        </div>
        </IconContext.Provider>
    )
}
export default NoMoney;