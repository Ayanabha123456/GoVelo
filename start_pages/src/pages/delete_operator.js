import React,{useState,useEffect}from 'react';
import Nav from '../components/hamburg_menu_operator.js';
import ContentCard from '../components/contentcard.js';
import ContentHeader from '../components/contentheader.js';
import Form from '../components/form.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteOperator = () => {
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    let cookies = document.cookie.split("token=")
    let token = cookies[cookies.length - 1].split(";")[0]
    const updatePassword = (e) => {
        setPassword(e.target.value)
      }
      const fields = [['Password', 'password', updatePassword]]

    const deleteAccount = () => {
      if(window.confirm("Are you sure?")){
          //write delete logic here
          axios.post('http://127.0.0.1:8000/delete/', {
            password: password

          },{
            headers: {
                'Authorization': 'Bearer ' + token
            }})
            .then(function (response) {
              if (response.data == "User deleted"){
                console.log(response);
                navigate("/");
              }else{
                alert("wrong password")
                console.log(response);
              }

            })
            .catch(function (error) {
              alert("wrong password")
              console.log(error);
            });

      } else {
          //stay on same page
          navigate("/delete_account")
      }
    }
    return (
        <div className='bookpage' id='outer-container'>
        <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id='page-wrap'>

            <ContentCard content={
              <div>
                <ContentHeader title='Enter your account password'/>
                <Form fields={fields} goBack="/operatorlanding" title="Delete" handleSubmit={deleteAccount}/>
              </div>
            }/>
        </div>
        </div>
    )
}

export default DeleteOperator;
