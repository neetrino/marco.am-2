'use client';

const sizeClasses = {
  small: 'w-12 h-8',
  medium: 'w-16 h-10',
  large: 'w-20 h-12',
};

interface PaymentMethodLogoProps {
  size?: 'small' | 'medium' | 'large';
}

/** Generic bank card icon for card payment step (no PSP branding). */
export function PaymentMethodLogo({ size = 'medium' }: PaymentMethodLogoProps) {
  return (
    <div
      className={`${sizeClasses[size]} flex-shrink-0 bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden`}
      aria-hidden
    >
      <svg
        className="w-8 h-8 text-purple-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    </div>
  );
}
