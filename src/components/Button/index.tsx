import React from "react";
import "./Button.scss";

interface ButtonProps {
  label: React.ReactNode; 
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  testId: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  testId,
  type = "button",
  disabled = false,
}) => (
  <button
    className={className}
    onClick={onClick}
    data-testid={testId}
    type={type}
    aria-label={typeof label === "string" ? label : ""}
    disabled={disabled}
  >
    {label}
  </button>
);

export default Button;
