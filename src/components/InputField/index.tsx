import React from "react";
import { FaSearch } from "react-icons/fa";
import "./InputField.scss";

interface InputFieldProps {
  label?: string;
  value: string;
  name: string;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  required?: boolean;
  testId: string;
  errorMessage?: string;
  showError?: boolean;
  classesName?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  name,
  placeholder,
  onChange,
  type = "text",
  required = false,
  testId,
  errorMessage = "This field is required",
  showError = false,
  classesName,
}) => {
  const isError = showError && !value;

  return (
    <div className={`input-field ${classesName}`}>
      <label htmlFor={testId} className="input-field-label">
        {label} {required && <span>*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          value={value}
          name={name}
          onChange={onChange}
          required={required}
          id={testId}
          data-testid={testId}
          aria-describedby={isError ? `${testId}-error` : undefined}
        />
      ) : (
        <>
          {placeholder && <FaSearch className="input-icon" />}
          <input
            type={type}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            id={testId}
            data-testid={testId}
            aria-describedby={isError ? `${testId}-error` : undefined}
          />
        </>
      )}
      {isError && (
        <span id={`${testId}-error`} className="error-message" role="alert">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default InputField;
