import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./InputField.scss";

interface InputFieldProps {
  label?: string;
  value: string;
  name: string;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClear?: () => void;
  type?: string;
  required?: boolean;
  testId: string;
  errorMessage?: string;
  showError?: boolean;
  classesName?: string;
  loading?: boolean;
  min?: string;
  max?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  name,
  placeholder,
  onChange,
  onClear,
  type = "text",
  required = false,
  testId,
  errorMessage = "This field is required",
  showError = false,
  classesName,
  loading,
  min,
  max,
}) => {
  const handleClear = () => {
    if (onClear) onClear();
  };

  return (
    <div className={`input-field ${classesName}`}>
      {label && (
        <label htmlFor={testId} className="input-field-label">
          {label} {required && <span>*</span>}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          className={loading ? "loading-input" : ""}
          value={value}
          name={name}
          onChange={onChange}
          required={required}
          id={testId}
          data-testid={testId}
          aria-required={required}
          aria-describedby={showError ? `${testId}-error` : undefined}
        />
      ) : (
        <>
          {placeholder && <FaSearch className="input-icon" />}
          <input
            className={loading ? "loading-input" : ""}
            type={type}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            min={min}
            max={max}
            id={testId}
            data-testid={testId}
            aria-required={required}
            aria-describedby={showError ? `${testId}-error` : undefined}
          />
          {value && onClear && (
            <FaTimes
              className="clear-icon"
              onClick={handleClear}
              data-testid={`${testId}-clear`}
            />
          )}
        </>
      )}
      {showError && (
        <span id={`${testId}-error`} className="error-message" role="alert">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default InputField;
