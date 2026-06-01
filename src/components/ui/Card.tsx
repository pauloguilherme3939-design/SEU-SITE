import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Padding interno. */
  padding?: 'sm' | 'md' | 'lg';
  /** Variação de elevação. */
  elevated?: boolean;
  /** Destaque com borda acentuada (ex: plano "Mais escolhido"). */
  featured?: boolean;
  /** Hover suave (link, card clicável). */
  interactive?: boolean;
}

const PADDING: Record<NonNullable<CardProps['padding']>, string> = {
  sm: 'p-5',
  md: 'p-6 sm:p-7',
  lg: 'p-8 sm:p-10',
};

export default function Card({
  padding = 'md',
  elevated = false,
  featured = false,
  interactive = false,
  className = '',
  children,
  ...rest
}: CardProps) {
  const base = 'rounded-lg bg-card text-ink border';
  const borderColor = featured ? 'border-accent/40' : 'border-line';
  const shadow = elevated ? 'shadow-soft' : '';
  const ring = featured ? 'shadow-glow' : '';
  const hover = interactive
    ? 'transition-colors hover:border-line-hi hover:bg-card-hi'
    : '';

  return (
    <div
      {...rest}
      className={`${base} ${borderColor} ${PADDING[padding]} ${shadow} ${ring} ${hover} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
