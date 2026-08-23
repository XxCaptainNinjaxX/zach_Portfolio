"use client";

import { type MouseEvent, useEffect, useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/ui/icons";
import {
  applyTheme,
  DEFAULT_THEME,
  readStoredTheme,
  THEME_CHANGE_EVENT,
  type Theme,
  transitionTheme,
} from "@/lib/theme";
import styles from "@/components/ThemeToggle/ThemeToggle.module.css";

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

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    readStoredTheme,
    getServerSnapshot,
  );

  useEffect(() => {
    applyTheme(readStoredTheme(), { notify: false });
  }, []);

  function handleToggle(event: MouseEvent<HTMLButtonElement>) {
    // The wipe grows from the control's centre, so the animation reads as coming
    // out of the thing that was pressed. Keyboard activation fires a click with
    // no useful pointer coordinates, which is why this measures the element
    // rather than reading event.clientX/Y.
    const bounds = event.currentTarget.getBoundingClientRect();

    transitionTheme(theme === "dark" ? "light" : "dark", {
      x: bounds.left + bounds.width / 2,
      y: bounds.top + bounds.height / 2,
    });
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
      className={styles.toggle}
    >
      {/* Both icons sit in the track; the opaque knob covers whichever side it rests on. */}
      <span
        aria-hidden="true"
        className={`${styles.icon} ${styles.iconLeft}`}
      >
        <SunIcon />
      </span>
      <span
        aria-hidden="true"
        className={`${styles.icon} ${styles.iconRight}`}
      >
        <MoonIcon />
      </span>

      <span
        aria-hidden="true"
        className={`${styles.knob} ${
          isDark ? styles.knobDark : styles.knobLight
        }`}
      />
    </button>
  );
}
