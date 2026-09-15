// ==================================
// Error Message Component
// ==================================
// Friendly error display for when something goes wrong.
// Usage: <ErrorMessage message="Something went wrong" onRetry={() => {}} />

import Button from '@/components/ui/Button';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  title = 'Something went wrong',
  message = 'Please try again later.',
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Error icon */}
      <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-gray-100">
        <svg
          className="w-6 h-6 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm">{message}</p>

      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
