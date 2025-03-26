import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

const Button = ({
  children,
  isLoading,
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        w-40
        h-10
        px-4
        py-2
        rounded-md
        text-sm
        font-medium
        bg-terracotta
        text-white
        hover:bg-amber-600
        focus:outline-none
        focus:ring-2
        focus:ring-amber-500
        focus:ring-offset-2
        disabled:opacity-50
        disabled:cursor-not-allowed
        transition-colors
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
