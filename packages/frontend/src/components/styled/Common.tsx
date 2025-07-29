import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = "" }) => (
  <div className={`container ${className}`}>{children}</div>
);

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`card ${className}`}>{children}</div>
);

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  type = "button",
  className = "",
}) => (
  <button
    className={`button ${variant !== "primary" ? variant : ""} ${className}`}
    onClick={onClick}
    disabled={disabled}
    type={type}
  >
    {children}
  </button>
);

interface InputProps {
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  [key: string]: any;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = "", ...props }, ref) => (
  <input className={`input ${className}`} ref={ref} {...props} />
));

Input.displayName = "Input";

interface SelectProps {
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className = "", ...props }, ref) => (
  <select className={`select ${className}`} ref={ref} {...props} />
));

Select.displayName = "Select";

interface FormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

export const Form: React.FC<FormProps> = ({ children, onSubmit, className = "" }) => (
  <form className={`form ${className}`} onSubmit={onSubmit}>
    {children}
  </form>
);

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({ children, className = "" }) => (
  <div className={`form-group ${className}`}>{children}</div>
);

interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({ children, htmlFor, className = "" }) => (
  <label className={`label ${className}`} htmlFor={htmlFor}>
    {children}
  </label>
);

interface ErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ children, className = "" }) => (
  <div className={`error-message ${className}`}>{children}</div>
);

interface LoadingSpinnerProps {
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className = "" }) => (
  <div className={`loading-spinner ${className}`} />
);
