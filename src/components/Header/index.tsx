import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBicycle } from "react-icons/fa";
import { testId } from "../../utilities/testId";
import ids from "./test-ids.json";
import { BreadcrumbData } from "use-react-router-breadcrumbs";
import "./header.scss";

interface HeaderProps {
  breadcrumbs: BreadcrumbData<string>[];
}

const Header: React.FC<HeaderProps> = ({ breadcrumbs }) => {
  if (breadcrumbs.length === 0) return null;

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
          {breadcrumbs.map(({ breadcrumb, match }, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const path = match.pathname;

            return (
              <span key={path} className="header__breadcrumb-item">
                {index > 0 && <span className="header__separator"> / </span>}
                {!isLast ? (
                  <NavLink
                    to={path}
                    className="header__link"
                    {...testId(ids.navLinkHeader)}
                  >
                    {breadcrumb}
                  </NavLink>
                ) : (
                  <span className="header__link header__link--last">
                    {breadcrumb}
                  </span>
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
