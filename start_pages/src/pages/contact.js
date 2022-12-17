import React,{useState,useEffect}from 'react';
import Nav from '../components/hamburg_menu.js';
import ContentCard from '../components/contentcard.js';
import ContentHeader from '../components/contentheader.js';
import ContactLine from '../components/contactline.js';
import Phone from '../components/phone.js';
import Email from '../components/email.js';
import Insta from '../components/instagram.js';
import Twitter from '../components/twitter.js';
import Button from '../components/button.js';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const navigate = useNavigate()
    const goBack = () => navigate("/landing")
    return(
        <div className='bookpage' id='outer-container'>
        <Nav pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
        <div id='page-wrap'>

            <ContentCard content={
              <div>
                <ContentHeader title='Contact Us'/>
                <ContactLine image={Phone} value="12345"/><br/>
                <ContactLine image={Email} value="GoVelo@org.ac.uk"/><br/>
                <ContactLine image={Insta} value="@GoVelo"/><br/>
                <ContactLine image={Twitter} value="@Velo_Go"/><br/>
                <Button title="Home" handleSubmit={goBack}/>
              </div>
            }/>
        </div>
        </div>
    )
}
export default Contact;