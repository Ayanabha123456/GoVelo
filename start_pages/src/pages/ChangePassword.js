import React,{ useState} from "react";
import Button from '../components/button.js';
import "./ChangePasswordPageStyle.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

//import Header from '../Header.js';
//import Footer from './MainComp/Footer.js';


const ChangePass = () => {
    const [newPassword, setNewPassword] = useState();
    const [newPasswordConfirm, setNewPasswordConfirm] = useState();
    const [oldPassword, setOldPassword] = useState();
    const navigate = useNavigate();
    let cookies = document.cookie.split("token=")
    let token = cookies[cookies.length - 1].split(";")[0]

    function parseJwt(t) {
        if (!t) { return; }
        const base64Url = t.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    const changePassword = () => {
      axios.post("http://127.0.0.1:8000/verifyPassword/", {oldPassword:oldPassword},{
          headers: {
              'Authorization': 'Bearer ' + token
          }
      }).then(function (response) {
        console.log(response.data)
        console.log("in then function")
        if (newPassword == newPasswordConfirm && response.data != 400){
          axios.post('http://localhost:8000/changePassword/', { newPassword: newPassword },{
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
            .then(function (response) {
              console.log(response.data)
              alert("Password changed succesfully")
              navigate("/")
            }).catch(function (err){
              alert("Your password doesnt match")
            })

        }
        else{
          alert("Your new password and new password confirm do not match, or you old password is wrong")
        }
    })
  }
    const updateCPassword = (e) => {
      setNewPasswordConfirm(e.target.value)
      console.log(newPasswordConfirm)
    }

    const updatePassword = (e) => {
      setNewPassword(e.target.value)
      console.log(newPassword)
    }

    const updateOldPassword = (e) => {
      setOldPassword(e.target.value)
      console.log(oldPassword)
    }

    return (
    <div id="password-change-form" className="changepassword">
        <p> <strong>Change Password</strong></p>
        <label for="Oldpassword" >Old Password</label>
        <input type="password" id="Oldpassword" className="Textboxcss" onChange={e => updateOldPassword(e)}/><br />
        <label for="password" >New Password</label>
        <input type="password" id="password" className="Textboxcss" onChange={e => updatePassword(e)} /><br />
        <label for="password-verify">Re-type Password</label>
        <input type="password" id="password-verify" className="Textboxcss" onChange={e => updateCPassword(e)} /><br />
        <Button title='Change Password' handleSubmit={changePassword} />
        <br />
        <br/>
        </div>
        //<Footer/>

      )

    //</div>
};

export default ChangePass;
