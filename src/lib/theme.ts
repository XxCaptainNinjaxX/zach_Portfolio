export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "zc-theme";
export const THEME_ATTRIBUTE = "data-theme";
export const THEME_CHANGE_EVENT = "zc-theme-change";
export const DEFAULT_THEME: Theme = "dark";

export function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}
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

export const THEME_TRANSITION_ATTRIBUTE = "data-theme-transition";

/** Set only around the View Transition wipe — see transitionTheme. */
export const THEME_WIPING_ATTRIBUTE = "data-theme-wiping";

const THEME_TRANSITION_TIMEOUT_MS = 700;

let transitionTimer: number | undefined;

type ApplyThemeOptions = {
  /**
   * Whether to tell subscribers. Set false when only re-asserting a value that
   * has not changed — notifying then would be a redundant render.
   */
  notify?: boolean;
  /**
   * Cross-fade the colour change. Off by default: applyTheme also runs on mount
   * to re-assert the attribute after a Strict Mode remount, and animating that
   * would fire a fade on every page load in development.
   */
  animate?: boolean;
};

/** Applies to the DOM and persists. Persistence failing must not block the visual change. */
export function applyTheme(
  theme: Theme,
  { notify = true, animate = false }: ApplyThemeOptions = {},
): void {
  const root = document.documentElement;

  if (animate) {
    root.setAttribute(THEME_TRANSITION_ATTRIBUTE, "");

    // Force a style flush so the transition declaration is in the computed style
    // *before* the colours change. Landing both in one recalculation leaves
    // whether the transition fires up to the engine, and they disagree.
    void getComputedStyle(root).backgroundColor;

    // Cleared first: without this, double-clicking the toggle lets the earlier
    // timer strip the attribute part-way through the second fade.
    window.clearTimeout(transitionTimer);
    transitionTimer = window.setTimeout(() => {
      root.removeAttribute(THEME_TRANSITION_ATTRIBUTE);
    }, THEME_TRANSITION_TIMEOUT_MS);
  }

  root.setAttribute(THEME_ATTRIBUTE, theme);

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

/** Viewport coordinates the wipe grows from — the centre of the control that was pressed. */
export type TransitionOrigin = {
  x: number;
  y: number;
};

/** Kept in sync with the colour-fade duration in globals.css by intent, not by machinery. */
const THEME_WIPE_DURATION_MS = 670;

/** Distance from the origin to the farthest viewport corner — how far the circle must grow to cover the screen. */
function radiusToFarthestCorner({ x, y }: TransitionOrigin): number {
  return Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );
}

/**
 * Changes the theme behind a circular wipe growing from `origin`.
 *
 * The View Transitions API snapshots the page before and after, so the new theme
 * is revealed through an expanding clip-path over the old one. That is the whole
 * trick: nothing is re-rendered twice, and the two states are real screenshots,
 * so every element crosses over together instead of each tweening its own colour.
 *
 * Where the API is missing, this falls through to applyTheme's cross-fade
 * instead. Both are correct end states; only the theatre differs.
 *
 * Deliberately ignores prefers-reduced-motion — the wipe always plays,
 * matching the same later decision applied to FeaturedImageRotator, the
 * theme toggle's knob, MenuDrawer, and FeaturedCarousel.
 */
export function transitionTheme(theme: Theme, origin: TransitionOrigin): void {
  const root = document.documentElement;

  if (typeof document.startViewTransition !== "function") {
    applyTheme(theme, { animate: true });
    return;
  }

  const radius = radiusToFarthestCorner(origin);

  // Sheds the header's backdrop-filter for the wipe's duration — expensive
  // to re-rasterize into the View Transition snapshot, and the likely
  // cause of a mid-wipe stall. Cleared once the whole transition settles.
  root.setAttribute(THEME_WIPING_ATTRIBUTE, "");

  const viewTransition = document.startViewTransition(() => {
    // Instant inside the callback: the wipe is doing the animating, and a
    // simultaneous colour tween would animate the new snapshot as well.
    applyTheme(theme, { animate: false });
  });

  viewTransition.finished.finally(() => {
    root.removeAttribute(THEME_WIPING_ATTRIBUTE);
  });

  viewTransition.ready
    .then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${origin.x}px ${origin.y}px)`,
            `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
          ],
        },
        {
          duration: THEME_WIPE_DURATION_MS,
          easing: "ease-in-out",
          // Clip the incoming snapshot only; the outgoing one stays put beneath it.
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {
      // `ready` rejects when the transition is skipped — a second toggle
      // mid-wipe, or the tab being hidden. The theme is already applied by then,
      // so there is nothing to recover.
    });
}
