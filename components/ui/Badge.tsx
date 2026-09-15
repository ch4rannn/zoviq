// ==================================
// Badge Component
// ==================================
// Small label used on product cards for "NEW", "SALE", "SOLD OUT".
// Usage: <Badge variant="new">NEW</Badge>

import { cn } from '@/lib/utils';

type BadgeVariant = 'new' | 'sale' | 'soldOut';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  new: 'bg-primary text-secondary',
  sale: 'bg-sale text-secondary',
  soldOut: 'bg-secondary text-primary border border-gray-200',
};

export default function Badge({ variant, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.05em]',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
