import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Nav.css';
import Logo from './logo';
import { Fragment } from 'react';

const Nav = props => {
  return (
      < Fragment >

          <header className="header1">

              <Menu className= "hmenu">
                  <a className="menu-item" href="/password_reset">
                      Reset Password
                  </a>
                  <a className="menu-item" href="/delete_account_manager">
                      Delete Account
                  </a>
                  <a className="menu-item" href="/">
                      Logout
                  </a>
              </Menu>
              <nav className="nav1">
                    <Logo/>
                </nav>
              </header>
      </Fragment>   
  );
}

export default Nav;