import React, { useState, useRef, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import "./InputSelect.scss";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectComponentProps {
  options: SelectOption[];
  onSelect: (value: string) => void;
  value?: string;
  placeholder?: string;
  required?: boolean;
  testId: string;
  showError?: boolean;
  errorMessage?: string;
  classesName?: string;
  displayLabel?: boolean;
}

const InputSelect: React.FC<SelectComponentProps> = ({
  options,
  onSelect,
  value,
  placeholder = "Select an option",
  required = false,
  testId,
  showError = false,
  errorMessage = "This field is required",
  classesName,
  displayLabel = true,
}) => {
  const isError = showError && !value;
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleSelect = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (optionValue: string) => {
    onSelect(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <div className="select-component" ref={selectRef}>
      <div className="select-container">
        {displayLabel && (
          <label htmlFor={testId} className="select-field-label">
            {placeholder} {required && <span>*</span>}
          </label>
        )}

        <input
          data-testid="select-input"
          className={`select-input ${classesName || ""}`}
          placeholder={displayLabel ? '' : displayLabel || placeholder}
          value={selectedLabel || ""}
          readOnly
          onClick={toggleSelect}
        />
        <span className={`select-arrow ${isOpen ? "open" : ""}`}>
          <FaArrowDown />
        </span>
      </div>

      {isOpen && (
        <ul className="select-menu" data-testid="select-menu">
          {options.map((option) => (
            <li
              key={option.value}
              className="select-option"
              data-testid="select-option"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {isError && (
        <span id={`${testId}-error`} className="error-message" role="alert">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default InputSelect;
