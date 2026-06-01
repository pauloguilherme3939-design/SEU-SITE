import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whats';
type Size = 'sm' | 'md' | 'lg';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children: ReactNode;
}

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type AsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string };

type ButtonProps = AsButton | AsLink;

const BASE =
  'inline-flex items-center justify-center gap-2 font-display font-semibold rounded-full transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none';

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-12 px-7 text-base',
};

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-accent text-bg hover:bg-accent-2 shadow-[0_10px_30px_-10px_rgba(45,212,141,0.55)]',
  secondary:
    'bg-card text-ink border border-line hover:border-line-hi hover:bg-card-hi',
  ghost: 'bg-transparent text-ink hover:bg-card-hi',
  whats:
    'bg-whats text-white hover:brightness-110 shadow-[0_10px_30px_-10px_rgba(37,211,102,0.55)]',
};

function isLinkProps(p: ButtonProps): p is AsLink {
  return typeof (p as AsLink).href === 'string';
}

export default function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    leadingIcon,
    trailingIcon,
    children,
  } = props;

  const className =
    `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${fullWidth ? 'w-full' : ''} ${('className' in props && props.className) || ''}`.trim();

  const content = (
    <>
      {leadingIcon ? <span aria-hidden>{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span aria-hidden>{trailingIcon}</span> : null}
    </>
  );

  if (isLinkProps(props)) {
    const {
      href,
      variant: _v,
      size: _s,
      fullWidth: _fw,
      leadingIcon: _l,
      trailingIcon: _t,
      children: _c,
      className: _cn,
      ...rest
    } = props;
    const isExternal = href.startsWith('http') || href.startsWith('mailto:');
    if (isExternal) {
      return (
        <a
          {...rest}
          href={href}
          className={className}
          target={rest.target ?? '_blank'}
          rel={rest.rel ?? 'noopener noreferrer'}
        >
          {content}
        </a>
      );
    }
    return (
      <Link {...rest} href={href} className={className}>
        {content}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    fullWidth: _fw,
    leadingIcon: _l,
    trailingIcon: _t,
    children: _c,
    className: _cn,
    ...buttonRest
  } = props;
  return (
    <button {...buttonRest} className={className} type={buttonRest.type ?? 'button'}>
      {content}
    </button>
  );
}
