// ==================================
// Button Component
// ==================================
// Reusable button with multiple variants matching ZOVIQ's design system.
// Usage: <Button variant="primary">Shop Now</Button>

import { cn } from '@/lib/utils';

/** Available button styles */
type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'text';

/** Available button sizes */
type ButtonSize = 'sm' | 'md' | 'lg' | 'full';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

// Style maps — keeps the component clean by separating styles from logic
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-secondary hover:bg-gray-800 active:scale-[0.98] disabled:bg-gray-300 disabled:text-gray-400',
  secondary:
    'bg-transparent text-primary border-[1.5px] border-primary hover:bg-primary hover:text-secondary active:scale-[0.98] disabled:border-gray-300 disabled:text-gray-400',
  accent:
    'bg-accent text-primary hover:bg-accent-hover active:scale-[0.98] disabled:bg-gray-300 disabled:text-gray-400',
  text:
    'bg-transparent text-primary underline underline-offset-4 decoration-1 hover:text-gray-600 p-0',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-xs',
  md: 'px-8 py-3.5 text-sm',
  lg: 'px-10 py-4.5 text-base',
  full: 'w-full px-0 py-4 text-sm',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles shared by all buttons
        'inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.05em] transition-all duration-200 cursor-pointer disabled:cursor-not-allowed',
        variantStyles[variant],
        // Don't apply size padding to text buttons
        variant !== 'text' && sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Show a spinner when loading */}
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
