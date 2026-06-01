import type { Config } from 'tailwindcss';

// Tailwind mapeado para os design tokens (src/styles/tokens.css).
// Use as classes (bg-bg, text-ink, border-line, text-accent, etc).
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-soft': 'var(--bg-soft)',
        card: 'var(--card)',
        'card-hi': 'var(--card-hi)',
        line: 'var(--line)',
        'line-hi': 'var(--line-hi)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        'muted-2': 'var(--muted-2)',
        accent: 'var(--accent)',
        'accent-2': 'var(--accent-2)',
        gold: 'var(--gold)',
        danger: 'var(--danger)',
        whats: 'var(--whats)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius-lg)',
        sm: 'var(--radius-sm)',
      },
      maxWidth: { content: 'var(--maxw)' },
      boxShadow: { soft: 'var(--shadow)', glow: 'var(--shadow-glow)' },
    },
  },
  plugins: [],
};
export default config;
