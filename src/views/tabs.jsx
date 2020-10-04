import React from 'react';
import { Link } from 'react-router-dom';
 
export const Tabs = () => {
  return (
    <div className="nav">
        <div className="nav__node">
          <Link to="/new" className="nav__link">
           New
          </Link>
        </div>
        <div className="nav__node">
          <Link to="/jobs" className="nav__link">
           Jobs
          </Link>
        </div>
        <div className="nav__node">
        <Link to="/top" className="nav__link">
           Top
          </Link>
        </div>
        <div className="nav__node">
        <Link to="/ask" className="nav__link">
           Ask
          </Link>
        </div>
        <div className="nav__node">
        <Link to="/shows" className="nav__link">
           Show          
        </Link>
        </div>
      </div>
  );
}