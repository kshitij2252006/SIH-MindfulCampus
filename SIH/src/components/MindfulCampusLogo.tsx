interface MindfulCampusLogoProps {
  className?: string;
  size?: number;
}

export function MindfulCampusLogo({ className = "", size = 32 }: MindfulCampusLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Professional gradient */}
        <linearGradient id="professionalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
        </linearGradient>

        {/* Subtle inner gradient */}
        <linearGradient id="innerGradient" x1="30%" y1="30%" x2="70%" y2="70%">
          <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
          <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.1 }} />
        </linearGradient>
      </defs>
      
      {/* Main head silhouette - clean and professional */}
      <path
        d="M50 20 C60 20, 68 28, 68 40 C68 44, 67 48, 65 51 L65 65 C65 68, 63 70, 60 71 L55 72 C52 72.5, 48 72.5, 45 72 L40 71 C37 70, 35 68, 35 65 L35 51 C33 48, 32 44, 32 40 C32 28, 40 20, 50 20 Z"
        fill="url(#professionalGradient)"
        opacity="0.95"
      />
      
      {/* Subtle mindfulness symbol - minimalist meditation hand */}
      <g transform="translate(50, 45)" opacity="0.4">
        {/* Simple meditation mudra - thumb and index finger touching */}
        <path
          d="M-3 -2 C-2 -4, 0 -4, 1 -2 C2 -1, 2 1, 1 2 C0 3, -1 3, -2 2 C-3 1, -3 0, -3 -2 Z"
          stroke="#ffffff"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 -2 C2 -4, 0 -4, -1 -2 C-2 -1, -2 1, -1 2 C0 3, 1 3, 2 2 C3 1, 3 0, 3 -2 Z"
          stroke="#ffffff"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Connection line */}
        <path
          d="M-1 -2 Q0 -3, 1 -2"
          stroke="#ffffff"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Very subtle highlight for depth */}
      <path
        d="M45 25 C48 23, 52 23, 55 25 C58 27, 60 30, 60 35"
        fill="url(#innerGradient)"
        opacity="0.6"
      />
    </svg>
  );
}