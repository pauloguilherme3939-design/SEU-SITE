import { site } from '@/data/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function WhatsAppFab() {
  const url = buildWhatsAppUrl(
    'Olá! Estou no site do Site no Ar Express e quero criar o site do meu negócio. Como funciona e quanto custa?',
  );

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whats shadow-[0_8px_32px_-8px_rgba(37,211,102,0.65)] transition-transform hover:scale-105 active:scale-95"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 2C8.268 2 2 8.268 2 16c0 2.4.63 4.654 1.735 6.607L2 30l7.612-1.995A13.928 13.928 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm-3.45 8.5c-.24-.604-.493-.617-.72-.628-.187-.009-.4-.008-.614-.008s-.56.08-.853.4c-.293.32-1.12 1.094-1.12 2.668 0 1.574 1.147 3.094 1.307 3.307.16.214 2.24 3.574 5.533 4.867 2.74 1.08 3.294.866 3.888.813.593-.053 1.92-.787 2.19-1.547.267-.76.267-1.413.187-1.547-.08-.133-.294-.213-.614-.373-.32-.16-1.894-.934-2.187-1.04-.294-.107-.507-.16-.72.16-.214.32-.827 1.04-1.014 1.254-.187.213-.374.24-.694.08-.32-.16-1.35-.497-2.574-1.587-.95-.847-1.594-1.893-1.78-2.213-.187-.32-.02-.493.14-.653.144-.143.32-.374.48-.56.16-.187.214-.32.32-.534.107-.213.054-.4-.027-.56-.08-.16-.707-1.73-.96-2.36z"
          fill="white"
        />
      </svg>
    </a>
  );
}
