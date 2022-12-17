import React from 'react';
import { Fragment } from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Nav.css';
import Logo from './logo';

// const Nav = () => {
//   return (
//     <Menu>
//       <a className="menu-item" href="/account">
//         Account
//       </a>
//       <a className="menu-item" href="/wallet">
//         Wallet
//       </a>
//       <a className="menu-item" href="/password_reset">
//         Reset Password
//       </a>
//     </Menu>
//   );
// };
// export default Nav;
const Nav = props => {
    return (
        <div >

            <header className="header1">

                <Menu className="hmenu">
                    <a className="menu-item" href="/account">
                        Account
                    </a>
                    <a className="menu-item" href="/password_reset">
                        Reset Password
                    </a>
                    <a className="menu-item" href="/wallet">
                        Wallet
                    </a>
                    <a className="menu-item" href="/contact">
                        Contact Us
                    </a>
                    <a className="menu-item" href="/about">
                        About Us
                    </a>
                    <a className="menu-item" href="/delete_account">
                        Delete Account
                    </a>
                    <a className='menu-item' href="/">
                        Logout
                    </a>
                </Menu>
                <nav className="nav1">
                    <Logo />
                </nav>
            </header>
        </div>
    );
}

export default Nav;
