interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  className = '',
  barClassName = 'bg-brand-500',
  showLabel = false,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={className}>
      {showLabel && (
        <div className="mb-1 flex items-center justify-between text-xs text-ink-500">
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-ink-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${barClassName}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
