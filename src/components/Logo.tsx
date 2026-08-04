"use client";

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="easybot-logo-grad"
          x1="0"
          y1="0"
          x2="44"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6366F1" />
          <stop offset="0.5" stopColor="#10B981" />
          <stop offset="1" stopColor="#14B8A6" />
        </linearGradient>
        <linearGradient
          id="easybot-inner-grad"
          x1="12"
          y1="10"
          x2="32"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#E2E8F0" stopOpacity="0.8" />
        </linearGradient>
        <filter
          id="logo-glow"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="userSpaceOnUse"
        >
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#10B981" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Rounded Container */}
      <rect
        width="44"
        height="44"
        rx="14"
        fill="url(#easybot-logo-grad)"
        filter="url(#logo-glow)"
      />

      {/* Chat Bubble & Robot Eye Motif */}
      <path
        d="M13 14.5C13 12.567 14.567 11 16.5 11H27.5C29.433 11 31 12.567 31 14.5V23.5C31 25.433 29.433 27 27.5 27H23L17.5 31.5V27H16.5C14.567 27 13 25.433 13 23.5V14.5Z"
        fill="url(#easybot-inner-grad)"
      />

      {/* Tech Dots / Lenses */}
      <circle cx="18.5" cy="19" r="2.2" fill="#0F172A" />
      <circle cx="25.5" cy="19" r="2.2" fill="#0F172A" />
      <circle cx="19.1" cy="18.4" r="0.8" fill="#10B981" />
      <circle cx="26.1" cy="18.4" r="0.8" fill="#10B981" />

      {/* Connection Beam */}
      <path
        d="M19 23.5C20.5 24.5 23.5 24.5 25 23.5"
        stroke="#0F172A"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  markClassName = "h-9 w-9",
  showWordmark = true,
}: {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName} />
      {showWordmark && (
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-lg tracking-tight text-white">
            Easybot
          </span>
          <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            AI
          </span>
        </div>
      )}
    </div>
  );
}
