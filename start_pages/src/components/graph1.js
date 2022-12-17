import axios from "axios";
import React, { useEffect, useState } from "react";
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../graphs', false, /\.(png|jpe?g|svg)$/));

const Graph1 = (props) => {
  const [hubs, setHubs] = useState(['All'])
  const [data, setData] = useState([])

  const labelStyles = {
    fontFamily: '"Montserrat",serif',
    fontSize: '25px',
    float: 'left',
    paddingLeft: '20px',
  }
  const selectStyles = {
    marginLeft: '20px',
    width: '200px',
    height: '30px',
    marginRight: '20px'
  }

  const loadVehicles = () => {
    axios.get("http://127.0.0.1:8000/book/", { params: { "1": 'get_hub' } })
      .then((r) => {
        setHubs([...hubs, ...r.data])
      })
  }

  useEffect(() => {
    loadVehicles()
  }, [])

  const choose = (e) => {
    structureData(e.target.value)
  }

  const structureData = (ch) => {
    ch = ch.replace(" ", "")
    setData(images[props.type + "_" + ch + ".png"])
  }

  let options = hubs.map(location => <option value={location}>{location}</option>)
  return (
    <>
      <label for="location" style={labelStyles}>Pick a hub</label>
      <select name="location" id="loaction" style={selectStyles} onChange={(e) => choose(e)}>
        <option value="" selected disabled hidden>Select Location</option>
        {options}
      </select>
      {data ? <img src={data} alt={data} /> :
        <p>Select Location</p>}
    </>
  );
}
export default Graph1;