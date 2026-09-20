import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { RiskLevel } from '@/types';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'brand' | 'success' | 'warning' | 'danger' | 'neutral';
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-ink-100 text-ink-600',
  brand: 'bg-brand-50 text-brand-700',
  success: 'bg-success-100 text-success-700',
  warning: 'bg-warning-100 text-warning-700',
  danger: 'bg-danger-100 text-danger-700',
  neutral: 'bg-ink-100 text-ink-500',
};

const dotStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-ink-400',
  brand: 'bg-brand-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
  neutral: 'bg-ink-400',
};

export function Badge({ children, variant = 'default', className, dot = false }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
        variantStyles[variant],
        className,
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dotStyles[variant])} />}
      {children}
    </span>
  );
}

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  const config: Record<RiskLevel, { label: string; variant: BadgeProps['variant'] }> = {
    'healthy': { label: 'Healthy', variant: 'success' },
    'attention': { label: 'Needs Attention', variant: 'warning' },
    'high-risk': { label: 'High Risk', variant: 'danger' },
  };
  const { label, variant } = config[level];
  return (
    <Badge variant={variant} dot className={className}>
      {label}
    </Badge>
  );
}
