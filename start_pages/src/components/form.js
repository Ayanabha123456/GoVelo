import React from 'react';
import Button from './button.js';
import { useNavigate } from 'react-router-dom';

const Form = (props) => {
    const navigate = useNavigate()
    const goBack = () => navigate(props.goBack)
    const formStyles = {
        margin:'auto',
        textAlign:'center',
        boxShadow:'1px 1px 3px 3px rgb(76,154,42)',
        width:'500px'
      }
      const labelStyles = {
        fontFamily: '"Montserrat",serif',
        fontSize:'25px',
        float:'left',
        paddingLeft:'20px'
      }
      let inputs = props.fields.map(field => <div className={field[0]} style={{paddingTop:'20px'}}>
      <label for={field[0]} style={labelStyles}>{field[0]}</label>
    <input style={{height:'30px'}} type={field[1]} id={field[0]} name={field[0]} onChange={field[2]} required/><br/>
  </div>)
      return (
        <div className='formCard' style={formStyles}>
                {inputs}
                <Button title="Go Back" handleSubmit={goBack}/>
                <Button title={props.title} handleSubmit={props.handleSubmit}/>
        </div>
      )
}
export default Form;
