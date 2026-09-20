import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  children: ReactNode;
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm focus-visible:ring-brand-500/30',
  secondary:
    'bg-white text-ink-700 border border-ink-200 hover:bg-ink-50 hover:border-ink-300 active:bg-ink-100 focus-visible:ring-brand-500/20',
  ghost:
    'text-ink-600 hover:bg-ink-100 hover:text-ink-800 active:bg-ink-200 focus-visible:ring-ink-400/30',
  danger:
    'bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-700 shadow-sm focus-visible:ring-danger-500/30',
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
