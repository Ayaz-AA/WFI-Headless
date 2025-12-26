export const ArrowRight = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ArrowLeft = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ArrowRightNav = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ArrowContinue = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8L20 16L12 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StarFilled = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="#F8770C" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0L10.163 5.527L16 6.112L11.82 9.944L13.056 16L8 12.927L2.944 16L4.18 9.944L0 6.112L5.837 5.527L8 0Z" fill="#F8770C"/>
  </svg>
);

export const StarHalf = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0L10.163 5.527L16 6.112L11.82 9.944L13.056 16L8 12.927V0Z" fill="#F8770C"/>
    <path d="M8 0L5.837 5.527L0 6.112L4.18 9.944L2.944 16L8 12.927V0Z" fill="none" stroke="#F8770C" strokeWidth="0.5"/>
  </svg>
);

export const StarEmpty = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0L10.163 5.527L16 6.112L11.82 9.944L13.056 16L8 12.927L2.944 16L4.18 9.944L0 6.112L5.837 5.527L8 0Z" stroke="#F8770C" strokeWidth="0.5" fill="none"/>
  </svg>
);

export const QuoteIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 21C3 17.4 5.4 15 9 15C12.6 15 15 17.4 15 21V21H3V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 21C3 17.4 5.4 15 9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const QuoteIconLarge = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 42C6 34.8 10.8 30 18 30C25.2 30 30 34.8 30 42V42H6V42Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 42C6 34.8 10.8 30 18 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const PlayButton = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="34" cy="34" r="34" fill="rgba(255,255,255,0.9)"/>
    <path d="M26 20L48 34L26 48V20Z" fill="#d46527"/>
  </svg>
);

export const LineDecor = ({ className = "w-20 h-px" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 1" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="0.5" x2="80" y2="0.5" stroke="currentColor" strokeWidth="1"/>
  </svg>
);

export const CheckCircle = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13.5" cy="13.5" r="12" stroke="#2563EB" strokeWidth="1.5"/>
    <path d="M9 13.5L12 16.5L18 10.5" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CloseIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

