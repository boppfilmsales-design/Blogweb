// Public URL for an R2 object key.
// When R2_PUBLIC_URL is configured (r2.dev domain or custom domain), uploads
// are served from there; otherwise they go through the /api/images proxy route.
export function publicUrlForKey(key: string, r2PublicUrl?: string): string {
  if (r2PublicUrl) return `${r2PublicUrl.replace(/\/$/, '')}/${key}`;
  return `/api/images/${key}`;
}
