export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function riskScoreColor(score: number): string {
  if (score >= 51) return 'text-danger-600';
  if (score >= 26) return 'text-warning-600';
  return 'text-success-600';
}

export function riskScoreBarColor(score: number): string {
  if (score >= 51) return 'bg-danger-500';
  if (score >= 26) return 'bg-warning-500';
  return 'bg-success-500';
}
