'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

export interface AccordionItem {
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenFirst?: boolean;
  className?: string;
}

function Item({
  item,
  isOpen,
  onToggle,
  idx,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  idx: number;
}) {
  const btnId  = `acc-${idx}-btn`;
  const bodyId = `acc-${idx}-body`;

  return (
    <div
      className={`rounded-lg border transition-colors duration-200 ${
        isOpen ? 'border-line-hi bg-card-hi' : 'border-line bg-card'
      }`}
    >
      <button
        type="button"
        id={btnId}
        aria-expanded={isOpen}
        aria-controls={bodyId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 rounded-lg px-5 py-4 text-left font-display font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg sm:px-6 sm:py-5"
      >
        <span className="text-balance">{item.question}</span>
        <span
          aria-hidden
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-muted transition-all duration-300 ${
            isOpen ? 'rotate-45 border-line-hi text-accent' : 'border-line'
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1V11M1 6H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      {/* grid-template-rows trick: anima de 0fr → 1fr sem medir altura */}
      <div
        id={bodyId}
        role="region"
        aria-labelledby={btnId}
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-0 leading-relaxed text-muted sm:px-6 sm:pb-6">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Accordion({
  items,
  defaultOpenFirst = false,
  className = '',
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenFirst ? 0 : null,
  );

  return (
    <div className={`flex flex-col gap-3 ${className}`.trim()}>
      {items.map((item, i) => (
        <Item
          key={item.question}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(prev => (prev === i ? null : i))}
          idx={i}
        />
      ))}
    </div>
  );
}
