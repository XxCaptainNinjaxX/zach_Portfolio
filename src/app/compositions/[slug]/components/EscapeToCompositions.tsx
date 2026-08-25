"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Isolated client island so the rest of CompositionDetail can stay a server
 * component — mirrors MenuDrawer's Escape listener rather than converting
 * the whole detail page to "use client".
 */
export function EscapeToCompositions() {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        router.push("/compositions");
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return null;
}
