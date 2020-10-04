import React from 'react';
import { Link } from 'react-router-dom';

import { Tabs } from './index';
import { logo } from '../assets/images';

export const Header = (props) => {
  return (
    <>
      <nav className="navbar navbar--bordered-bottom">
        <div className="container">
          <div className="navbar__wrap navbar__wrap--content-spread">
            <div className="navbar__left">
              <Link to='/' className="d-flex align-items-center">
                <div className="navbar__logo">
                  <img src={logo} alt="logo" />
                </div>
                <h5 className="text-bold color-orange-20">Hacker News</h5>
             </Link>
             </div>
            <Tabs />
          </div>
        </div>
      </nav>
    </>
  );
};

