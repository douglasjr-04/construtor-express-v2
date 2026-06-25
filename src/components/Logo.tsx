type Props = { size?: number; withWordmark?: boolean; className?: string };

export function Logo({ size = 36, withWordmark = true, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        aria-label="ARQ CLUB"
        className="shrink-0"
      >
        <rect x="1" y="1" width="46" height="46" rx="10" stroke="var(--gold)" strokeOpacity="0.35" strokeWidth="1" />
        {/* Architectural A: roof + base + crossbar */}
        <path d="M10 38 L24 8 L38 38" stroke="var(--gold)" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
        <path d="M16 26 L32 26" stroke="var(--gold)" strokeWidth="2" strokeLinecap="square" />
        <path d="M24 8 L24 38" stroke="var(--gold)" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="24" cy="8" r="1.5" fill="var(--gold)" />
      </svg>
      {withWordmark && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-semibold tracking-[0.22em] text-foreground">ARQ</span>
          <span className="font-display text-[10px] font-medium tracking-[0.38em] text-[var(--gold)]">CLUB</span>
        </div>
      )}
    </div>
  );
}
