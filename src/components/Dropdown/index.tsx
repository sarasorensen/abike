import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaEllipsisH,
  FaArrowDown,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaPlus
} from "react-icons/fa";
import Button from "../Button/index";
import { testId } from "../../utilities//testId";
import ids from "./test-ids.json";
import "./Dropdown.scss";

interface DropdownProps {
  options: {
    label: string;
    action: string;
    icon?: string;
  }[];
  type?: string;
}

type IconMapping = {
  [key: string]: React.ComponentType<any>;
};

const iconMapping: IconMapping = {
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaPlus
};

const Dropdown: React.FC<DropdownProps> = ({ options, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getIcon = (iconName: string) => {
    const IconComponent = iconMapping[iconName];
    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      {type === "table" ? (
        <Button
          className={`${type === "table" ? "dropdown-transparent-button" : ""}`}
          label={
            <>
              <span className={`${isOpen ? "open" : ""}`}>
                <FaEllipsisH />
              </span>
            </>
          }
          onClick={toggleDropdown}
          testId={ids.buttonOptions}
        />
      ) : (
        <Button
          label={
            <>
              Options
              <span className={`dropdown-arrow`}>
                <FaArrowDown />
              </span>
            </>
          }
          onClick={toggleDropdown}
          testId={ids.buttonOptions}
        />
      )}

      {isOpen && (
        <ul className="dropdown-menu" data-testid="button_dropdown_elements">
          {options.map((option, index) => (
            <Link
              to={option.action}
              className="dropdown-link"
              {...testId(ids.buttonOptionsItem)}
              key={index}
            >
              <li className="dropdown-item">
                {option.icon && (
                  <span className="dropdown-item-icon">{getIcon(option.icon)}</span>
                )}
                <span>{option.label}</span>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
