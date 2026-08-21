"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";

type CopyEmailButtonProps = {
  email: string;
};

/**
 * Copies the address to the clipboard.
 *
 * Supplementary to the mailto: link beside it, not a replacement — plenty of
 * people have no mail client wired up to mailto and want the string instead.
 */
export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (!hasCopied) return;
    const timer = window.setTimeout(() => setHasCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [hasCopied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setHasCopied(true);
    } catch {
      // Clipboard access is denied on insecure origins and in some embedded
      // browsers. The address is visible on the page, so failing quietly leaves
      // the user no worse off than if this button did not exist.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="tracked-caps-tight inline-flex items-center gap-2 border border-gold-hairline px-4 py-2 text-[0.6rem] text-ink-muted transition-colors hover:text-gold"
    >
      {hasCopied ? <CheckIcon /> : <CopyIcon />}
      {hasCopied ? "Copied" : "Copy address"}
      {/* Announced on change; the icon swap alone is invisible to a screen reader. */}
      <span aria-live="polite" className="sr-only">
        {hasCopied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}
