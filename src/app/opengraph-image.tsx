import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card, rendered at build time.
 *
 * No custom font is loaded on purpose: fetching one would add a network call to
 * every build for a card most viewers see at thumbnail size. System serif at
 * this scale is close enough to the display face to read as the same brand.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b1a3a",
          color: "#f2f4f8",
          fontFamily: "Georgia, serif",
          // Inset gold frame, echoing the site's PageFrame.
          border: "1px solid #8a6f1e",
          outline: "24px solid #0b1a3a",
          outlineOffset: "-24px",
        }}
      >
        <div
          style={{
            fontSize: 76,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {site.name}
        </div>

        <div
          style={{
            width: 120,
            height: 1,
            backgroundColor: "#c9a227",
            margin: "36px 0",
          }}
        />

        <div
          style={{
            fontSize: 30,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#c9a227",
          }}
        >
          {site.role}
        </div>
      </div>
    ),
    size,
  );
}
