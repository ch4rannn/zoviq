// ==================================
// Quantity Selector
// ==================================
// Component for adjusting the number of items.
// Shows a minus button, a number, and a plus button.

'use client';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center border border-gray-200 h-12 w-32">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        className="w-10 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
        </svg>
      </button>

      <div className="flex-1 text-center font-medium text-sm text-primary">
        {quantity}
      </div>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="w-10 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
}
