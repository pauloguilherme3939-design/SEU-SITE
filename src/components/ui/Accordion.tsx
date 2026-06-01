import type { ReactNode } from 'react';

/**
 * Accordion sem JS: usa <details>/<summary> nativos.
 * Acessível por padrão, sem flash de hidratação, pesa zero KB.
 */

export interface AccordionItem {
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Se true, abre o primeiro item por padrão. */
  defaultOpenFirst?: boolean;
  className?: string;
}

export default function Accordion({
  items,
  defaultOpenFirst = false,
  className = '',
}: AccordionProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`.trim()}>
      {items.map((item, i) => (
        <details
          key={item.question}
          open={defaultOpenFirst && i === 0}
          className="group rounded-lg border border-line bg-card transition-colors open:border-line-hi open:bg-card-hi"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 font-display font-semibold text-ink [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-lg">
            <span className="text-balance">{item.question}</span>
            <span
              aria-hidden
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform group-open:rotate-45 group-open:text-accent group-open:border-line-hi"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 1V11M1 6H11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </summary>
          <div className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6 text-muted leading-relaxed">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
