import React from "react";
import { NavLink } from "react-router-dom";

import {testId} from "../../utilities//testId"
import ids from "./test-ids.json";
import './header.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="header__title">ABike</h1>
      <nav className="header__nav">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive ? "header__link header__link--active" : "header__link"
          }
          {...testId(ids.navLinkOrderList)}
        >
          Orders List
        </NavLink>
        <NavLink 
          to="/order/new" 
          className={({ isActive }) => 
            isActive ? "header__link header__link--active" : "header__link"
          }
          {...testId(ids.navLinkNewOrderList)}
        >
          New Order
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;