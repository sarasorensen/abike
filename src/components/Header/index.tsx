import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBicycle } from "react-icons/fa";
import { testId } from "../../utilities/testId";
import ids from "./test-ids.json";
import "./header.scss";

const Header: React.FC = () => {
  const location = useLocation();

  const pathParts = location.pathname.split("/").filter(Boolean);

  return (
    <header className="header">
      <div className="header__logo-breadcrumbs">
        {/* Logo with the Bicycle icon */}
        <Link to="/orders" className="header__title">
          ABike
          <span>
            {" "}
            <FaBicycle />
          </span>
        </Link>

        {/* Breadcrumbs */}
        <nav className="header__breadcrumbs">
          {pathParts.length > 0 && (
            <>
              {pathParts.map((part, index) => {
                const isLast = index === pathParts.length - 1;
                const path = `/${pathParts.slice(0, index + 1).join("/")}`;
                return (
                  <span key={path} className="header__breadcrumb-item">
                    {index > 0 && <span className="header__separator"> / </span>} 
                    {!isLast ? (
                      <NavLink
                        to={path}
                        className="header__link"
                        {...testId(ids.navLinkHeader)}
                      >
                        {part.charAt(0).toUpperCase() + part.slice(1)}
                      </NavLink>
                    ) : (
                      <span className="header__link">
                        {part.charAt(0).toUpperCase() + part.slice(1)}
                      </span>
                    )}
                  </span>
                );
              })}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
