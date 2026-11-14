// 统一解析产品图片字段
// 支持格式：
// 1. JSON 数组字符串: '["url1","url2"]'
// 2. 逗号分隔字符串: 'url1,url2'
// 3. 单个 URL 或 data URI 字符串: 'https://...' 或 'data:image/...'
// 4. 空字符串: ''

/** Public origin of the R2 bucket that holds the seeded product photos. */
export const R2_PUBLIC = 'https://pub-39b7138db749493793fdbe2a9e90d150.r2.dev';

/** Strip the decorations PowerShell/Excel exports leave in image fields. */
function cleanImagePath(value: string): string {
  return value
    .trim()
    .replace(/^\.\//, '')
    .replace(/^["']+|["']+$/g, '')
    .trim();
}

export function parseProductImages(images: string | null | undefined): string[] {
  if (!images || images.trim() === '') return [];

  const raw = images.trim();

  // 尝试 JSON 解析
  if (raw.startsWith('[')) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
          .filter((img: any) => typeof img === 'string' && img.trim().length > 0)
          .map(cleanImagePath);
      }
    } catch {
      // 解析失败，继续走下面的逻辑
    }
  }

  // 逗号分隔
  if (raw.includes(',')) {
    const parts = raw.split(',').map((s) => cleanImagePath(s)).filter(Boolean);
    if (parts.length > 0) return parts;
  }

  // 单个 URL 或 data URI
  return [cleanImagePath(raw)];
}

/**
 * Turn a stored image value into a URL the browser can load.
 *
 * Legacy rows and the bundled snapshot store bucket-relative paths such as
 * `images/AEC-group-boppfilmsale-001 (14).jpg`. Those used to be used verbatim,
 * so they resolved against the current route and returned 404. They now resolve
 * against the public R2 bucket. Absolute URLs and data URIs pass through.
 */
export function resolveImageUrl(url: string | null | undefined): string {
  if (!url) return '';
  const value = cleanImagePath(String(url));
  if (!value) return '';
  if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:') || value.startsWith('/')) {
    return value;
  }
  return `${R2_PUBLIC}/${value.replace(/^\/+/, '')}`;
}

/** Encode a resolved URL so filenames with spaces or brackets still load. */
export function encodeImageUrl(url: string | null | undefined): string {
  const resolved = resolveImageUrl(url);
  if (!resolved) return '';
  if (resolved.startsWith('data:')) return resolved;
  try {
    return encodeURI(resolved);
  } catch {
    return resolved;
  }
}
