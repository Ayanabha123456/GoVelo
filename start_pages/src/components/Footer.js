import React from "react";
import "./Footerstyle.css";

const Footer = () => (
    <div className="footer">
        <footer className="site-footer">
            <div className ="container">
                <div class="row">
                    
                    <div className ="col-xs-6 col-md-3 text6">
                        <h6>Quick Links</h6>
                        <ul class="footer-links">
                            <li><a href="/About">About Us</a></li>
                            <li><a href="/Home">Home</a></li>
                            <li><a href="/UserInformation">User Information</a></li>
                            <li><a href="WalletPage/">Wallet</a></li>
                            <li><a href="/Contactus">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
                <hr/>
            </div>
            <div className ="container">
                <div className="row">
                    <div className ="col-md-8 col-sm-6 col-xs-12">
                        <p className ="copyright-text">Copyright &copy; 2022  All Rights Reserved by 
                            <a href="#"> Go-velo</a>.
                        </p>
                    </div>

                
                </div>
            </div>
        </footer> 
    </div>
);

export default Footer;
