/**
 * Theme storage and the blocking script that applies it before first paint.
 *
 * Shared by ThemeScript (server, renders the string into <head>) and ThemeToggle
 * (client, reads and writes the same key). Both must agree on the key and the
 * attribute or the toggle desynchronises from what the script applied.
 */

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "zc-theme";
export const THEME_ATTRIBUTE = "data-theme";

/**
 * Dispatched on the window after a same-tab theme change.
 *
 * The browser's own `storage` event only fires in *other* documents, so a tab
 * that changes the theme never hears about it. This event fills that gap and is
 * what ThemeToggle's useSyncExternalStore subscribes to.
 */
export const THEME_CHANGE_EVENT = "zc-theme-change";

/** First visit is always dark. The design is authored dark; light is a courtesy mode. */
export const DEFAULT_THEME: Theme = "dark";

export function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}

/**
 * Minified on purpose — this string is inlined into <head> and blocks parsing,
 * so every byte is paid for on every page load.
 *
 * The try/catch is not optional: localStorage throws in Safari private mode and
 * under some cookie blockers, and an uncaught throw in a blocking head script
 * aborts the rest of the parse.
 */
export const themeScriptSource = `(function(){try{var stored=localStorage.getItem("${THEME_STORAGE_KEY}");if(stored==="dark"||stored==="light"){document.documentElement.setAttribute("${THEME_ATTRIBUTE}",stored)}}catch(error){}})()`;

/** Reads the stored preference. Returns the default when unset or unreadable. */
export function readStoredTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

type ApplyThemeOptions = {
  /**
   * Whether to tell subscribers. Set false when only re-asserting a value that
   * has not changed — notifying then would be a redundant render.
   */
  notify?: boolean;
};

/** Applies to the DOM and persists. Persistence failing must not block the visual change. */
export function applyTheme(
  theme: Theme,
  { notify = true }: ApplyThemeOptions = {},
): void {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable (private mode, blocked cookies). The theme still applies
    // for this page view; it just will not survive a reload.
  }

  if (notify) {
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }
}
