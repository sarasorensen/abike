import React from "react";
import "./InputField.scss";

interface InputFieldProps {
  label: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
  testId: string;
  errorMessage?: string;
  showError?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  name,
  onChange,
  type = "text",
  required = false,
  testId,
  errorMessage = "This field is required", // Default error message
  showError = false,  // Default is false to show error only when needed
}) => {
  const isError = showError && !value; // Show error only if showError is true and field is empty

  return (
    <div className="input-field">
      <label htmlFor={testId}>
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
        <input
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          required={required}
          id={testId}
          data-testid={testId}
          aria-describedby={isError ? `${testId}-error` : undefined}
        />
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
