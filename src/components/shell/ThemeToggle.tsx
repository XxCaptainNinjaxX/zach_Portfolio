"use client";

import { useEffect, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/ui/icons";
import {
  applyTheme,
  DEFAULT_THEME,
  readStoredTheme,
  THEME_CHANGE_EVENT,
  type Theme,
} from "@/lib/theme";

/**
 * Notifies subscribers when the theme changes.
 *
 * `storage` covers other tabs (the browser only fires it cross-document); the
 * custom event covers this one. Together they keep every open tab in sync.
 */
function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getServerSnapshot(): Theme {
  return DEFAULT_THEME;
}

/**
 * Two-state dark/light switch, matching the mockup's pill toggle.
 *
 * useSyncExternalStore rather than useState + useEffect, because the theme is
 * genuinely external state: it lives in localStorage and on the <html> element,
 * both unreachable during server render. This hook is the one API that handles
 * exactly that shape — React renders getServerSnapshot() during hydration so the
 * markup matches the server, then swaps to the client snapshot immediately
 * afterwards *without* reporting a hydration mismatch.
 *
 * The alternatives both misbehave: a lazy useState initialiser reading
 * localStorage renders different markup than the server sent (hydration error,
 * which makes React re-render the subtree and reintroduces the flash), and
 * setState-in-an-effect causes a cascading render.
 */
export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    readStoredTheme,
    getServerSnapshot,
  );

  useEffect(() => {
    // Re-apply the attribute after React's Strict Mode remount. In development
    // React remounts once and, on that remount, resets <html> to only the
    // attributes it manages from JSX — wiping the one ThemeScript set during
    // parsing. A no-op in production, but without it dev looks broken in a
    // misleading way. Writing to the DOM, not to React state.
    applyTheme(readStoredTheme(), { notify: false });
  }, []);

  function handleToggle() {
    applyTheme(theme === "dark" ? "light" : "dark");
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={handleToggle}
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative inline-flex h-7 w-14 shrink-0 items-center rounded-full border border-gold-hairline bg-surface-sunken px-1 transition-colors"
    >
      <span
        aria-hidden="true"
        className={`inline-flex size-5 items-center justify-center rounded-full bg-gold text-surface transition-transform duration-200 ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}
