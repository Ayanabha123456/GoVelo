import React from "react";
import { IconContext } from "react-icons";
import {BiMoveHorizontal} from "react-icons/bi";

const Move = () => {
    return(
        <IconContext.Provider value={{ color: "rgb(76,154,42)", className: "global-class-name", size:"90px" }}>
        <div>
            <BiMoveHorizontal />
        </div>
        </IconContext.Provider>
    )
}
export default Move;