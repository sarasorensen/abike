import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBicycle } from "react-icons/fa";
import { testId } from "../../utilities/testId";
import ids from "./test-ids.json";
import { BreadcrumbData } from "use-react-router-breadcrumbs"; 
import "./header.scss";

interface HeaderProps {
  breadcrumbs: BreadcrumbData<string>[]; // Ensure breadcrumbs are of type BreadcrumbData<string>[]
}

const Header: React.FC<HeaderProps> = ({ breadcrumbs }) => {
  return (
    <header className="header">
      <div className="header__logo-breadcrumbs">
        <Link to="/orders" className="header__title">
          ABike
          <span>
            {" "}
            <FaBicycle />
          </span>
        </Link>

        <nav className="header__breadcrumbs">
          {breadcrumbs.length > 0 && (
            <>
              {breadcrumbs.map(({ breadcrumb, match }, index) => {
                const isLast = index === breadcrumbs.length - 1;
                const path = match.pathname; // Use pathname from match

                return (
                  <span key={path} className="header__breadcrumb-item">
                    {index > 0 && <span className="header__separator"> / </span>}
                    {!isLast ? (
                      <NavLink
                        to={path} // Link to the path using match.pathname
                        className="header__link"
                        {...testId(ids.navLinkHeader)}
                      >
                        {breadcrumb}
                      </NavLink>
                    ) : (
                      <span className="header__link">{breadcrumb}</span>
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
