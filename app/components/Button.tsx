import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  variant?: 'regular' | 'outline';
}

const Button = ({
  children,
  isLoading,
  disabled,
  variant = 'regular',
  ...props
}: ButtonProps) => {
  const baseStyles = "flex items-center justify-center border-2 border-secondary text-sm px-6 py-2 rounded-md cursor-pointer";
  const regularStyles = "bg-secondary text-white";
  const outlineStyles = "text-secondary hover:bg-secondary hover:text-white transition-colors";
  return (
    <button
      className={`${baseStyles} ${variant === 'regular' ? regularStyles : outlineStyles}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
