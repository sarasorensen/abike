import React, { useState, useRef, useEffect } from "react";
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
  classesName?: string;
  displayLabel?: boolean;
  loading?: boolean;
}

const InputSelect: React.FC<SelectComponentProps> = ({
  options,
  onSelect,
  value,
  placeholder = "Select service type",
  required = false,
  testId,
  classesName,
  displayLabel = true,
  loading,
}) => {
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
      {displayLabel && (
        <label htmlFor={testId} className="select-field-label">
          {placeholder} {required && <span>*</span>}
        </label>
      )}

      <input
        data-testid={testId}
        className={`select-input ${classesName || ""} ${
          loading ? "loading-select" : ""
        }`}
        value={selectedLabel || ""}
        readOnly
        onClick={toggleSelect}
        id={testId}
        aria-required={required}
      />

      {isOpen && (
        <ul className="select-menu" data-testid="select-menu" role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              className="select-option"
              data-testid="select-option"
              onClick={() => handleOptionClick(option.value)}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputSelect;
