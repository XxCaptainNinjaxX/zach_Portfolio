/**
 * Prefixes image sources with the deploy subfolder.
 *
 * `basePath` is applied by the image loader, but `images.unoptimized` short-circuits
 * before the loader runs, so a static export at a subfolder emits root-relative image
 * URLs that 404. A custom loader is the only hook that still fires, so the prefix is
 * applied here instead. Width and quality are ignored on purpose: a static export has
 * no optimizer, so every size resolves to the same original file.
 *
 * ⚠️ The prefix must stay in sync with `basePath` in next.config.ts.
 */
export default function imageLoader({ src }: { src: string }): string {
  // Remote sources are already absolute; only site-relative paths need the prefix.
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  return `/projects/zach${src}`;
}
