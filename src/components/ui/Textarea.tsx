import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, id, className = '', required, rows = 4, ...rest },
  ref,
) {
  const generatedId = id ?? rest.name;
  const describedBy =
    [hint && `${generatedId}-hint`, error && `${generatedId}-error`].filter(Boolean).join(' ') ||
    undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={generatedId} className="text-sm font-medium text-ink">
          {label}
          {required && <span className="ml-0.5 text-accent">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={generatedId}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`w-full rounded-lg border border-line bg-card-hi px-4 py-3 text-ink placeholder:text-muted-2 transition-colors focus:border-line-hi focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-50 resize-y ${error ? 'border-danger focus:border-danger focus:ring-danger/40' : ''} ${className}`.trim()}
        {...rest}
      />
      {hint && !error && (
        <p id={`${generatedId}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${generatedId}-error`} className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
});

export default Textarea;
