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
        // Tier label colors — use as text-tier-prata, text-tier-ouro, etc.
        tier: {
          prata:    'var(--tier-prata-text)',
          ouro:     'var(--tier-ouro-text)',
          platina:  'var(--tier-platina-text)',
          diamante: 'var(--tier-diamante-text)',
        },
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
      boxShadow: {
        soft: 'var(--shadow)',
        glow: 'var(--shadow-glow)',
        // Tier card shadows — shadow-tier-prata, shadow-tier-ouro, etc.
        'tier-prata':    'var(--tier-prata-shadow)',
        'tier-ouro':     'var(--tier-ouro-shadow)',
        'tier-platina':  'var(--tier-platina-shadow)',
        'tier-diamante': 'var(--tier-diamante-shadow)',
      },
    },
  },
  plugins: [],
};
export default config;
