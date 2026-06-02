import type { HTMLAttributes } from 'react';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** ID âncora opcional para deep-link / navegação interna. */
  anchorId?: string;
  /** Variação de espaçamento vertical. */
  spacing?: 'sm' | 'md' | 'lg';
  /** Marca a seção como hero (sem padding-top extra para nav fixa). */
  hero?: boolean;
}

const SPACING: Record<NonNullable<SectionProps['spacing']>, string> = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-24',
  lg: 'py-20 sm:py-32',
};

export default function Section({
  anchorId,
  spacing = 'md',
  hero = false,
  className = '',
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      {...rest}
      id={anchorId}
      className={`${hero ? 'pt-28 sm:pt-32 pb-16 sm:pb-24' : SPACING[spacing]} ${className}`.trim()}
      style={anchorId ? { scrollMarginTop: '80px', ...rest.style } : rest.style}
    >
      {children}
    </section>
  );
}
