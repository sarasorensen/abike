import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEllipsisH,
  FaArrowDown,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaPlus,
} from "react-icons/fa";
import Button from "../Button/index";
import {testId} from "../../utilities/testId"
import ids from "./test-ids.json";
import "./Dropdown.scss";

interface DropdownProps {
  options: {
    label: string;
    action?: string;
    icon?: keyof typeof iconMapping;
    id?: string;
  }[];
  type?: string;
  onSelect?: (label: string, id?: string) => void;
}

const iconMapping = {
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaPlus,
};

type IconMapping = typeof iconMapping;

const Dropdown: React.FC<DropdownProps> = ({ options, type, onSelect }) => {
  const navigate = useNavigate();
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

  const getIcon = (iconName?: keyof IconMapping) => {
    if (!iconName) return null;

    const IconComponent = iconMapping[iconName];
    return IconComponent ? <IconComponent /> : null;
  };

  const handleOptionClick = (options: any, id?: string) => {
    if (options.action) {
      navigate(options.action);
    }

    if (onSelect) {
      onSelect(options.label, id);
    }
    setIsOpen(false);
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
          testId={`${ids.buttonOptions}_table`}
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
        <ul className="dropdown-menu" {...testId(ids.dropdownMenu)}>
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => handleOptionClick(option, option.id)}
              {...testId(option.label)}
            >
              {option.icon && (
                <span className="dropdown-item-icon">
                  {getIcon(option.icon)}
                </span>
              )}
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
