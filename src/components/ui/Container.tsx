import type { HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

const SIZES: Record<NonNullable<ContainerProps['size']>, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-content',
};

export default function Container({
  size = 'lg',
  className = '',
  children,
  ...rest
}: ContainerProps) {
  return (
    <div
      {...rest}
      className={`${SIZES[size]} mx-auto w-full px-6 sm:px-8 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
