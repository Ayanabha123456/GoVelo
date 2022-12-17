import axios from "axios";
import React, { useEffect, useState } from "react";
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../graphs', false, /\.(png|jpe?g|svg)$/));

const Graph2 = (props) => {

  return (
    <>
      <img src={images[props.graph]} alt={images[props.graph]} />
    </>
  );
}
export default Graph2;