/**
 * Inline stroked icons, sized by the `size` prop and coloured by currentColor.
 *
 * Kept in-repo rather than pulling an icon package: six icons at ~10 lines each
 * is cheaper than a dependency, and these need to match the mockup's hairline
 * weight, which most icon sets draw heavier.
 *
 * All are decorative — every call site wraps them in a control that carries its
 * own accessible name — so they are hidden from assistive technology here.
 */

type IconProps = {
  size?: number;
  className?: string;
};

function iconAttributes(size: number, className?: string) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor" as const,
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: "false" as const,
    className,
  };
}

export function MailIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...iconAttributes(size, className)}>
      <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
      <path d="M3 6.5 12 13l9-6.5" />
    </svg>
  );
}

export function MenuIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...iconAttributes(size, className)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...iconAttributes(size, className)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function MoonIcon({ size = 14, className }: IconProps) {
  return (
    <svg {...iconAttributes(size, className)}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

export function SunIcon({ size = 14, className }: IconProps) {
  return (
    <svg {...iconAttributes(size, className)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
    </svg>
  );
}

export function ChevronLeftIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...iconAttributes(size, className)}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...iconAttributes(size, className)}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function CheckIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...iconAttributes(size, className)}>
      <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
    </svg>
  );
}

export function CopyIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...iconAttributes(size, className)}>
      <rect x="9" y="9" width="11.5" height="11.5" rx="1.5" />
      <path d="M6 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V6" />
    </svg>
  );
}
