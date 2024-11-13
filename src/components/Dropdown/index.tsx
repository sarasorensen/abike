import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/index";
import { testId } from "../../utilities//testId";
import ids from "./test-ids.json";
import "./Dropdown.scss";

interface DropdownProps {
  options: {
    label: string;
    icon: string;
    action: string;
  }[];
}

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <Button
        label={
          <>
            Options
            <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>
              &#9660;
            </span>
          </>
        }
        onClick={toggleDropdown}
        testId={ids.buttonOptions}
      />

      {isOpen && (
        <ul className="dropdown-menu" data-testid="button_dropdown_elements">
          {options.map((option, index) => (
            <li key={index} className="dropdown-item">
              <Link
                to={option.action}
                className="dropdown-link"
                {...testId(ids.buttonOptionsItem)}
              >
                <span>{option.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
