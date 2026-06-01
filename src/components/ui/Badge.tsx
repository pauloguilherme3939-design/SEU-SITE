import type { HTMLAttributes, ReactNode } from 'react';

type BadgeVariant = 'accent' | 'gold' | 'muted' | 'outline';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  icon?: ReactNode;
  children: ReactNode;
}

const VARIANTS: Record<BadgeVariant, string> = {
  accent: 'bg-accent/10 text-accent border border-accent/25',
  gold: 'bg-gold/10 text-gold border border-gold/25',
  muted: 'bg-card-hi text-muted border border-line',
  outline: 'bg-transparent text-ink border border-line',
};

export default function Badge({
  variant = 'accent',
  icon,
  className = '',
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      {...rest}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${VARIANTS[variant]} ${className}`.trim()}
    >
      {icon ? <span aria-hidden>{icon}</span> : null}
      {children}
    </span>
  );
}
