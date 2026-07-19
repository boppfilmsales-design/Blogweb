// 统一解析产品图片字段
// 支持格式：
// 1. JSON 数组字符串: '["url1","url2"]'
// 2. 逗号分隔字符串: 'url1,url2'
// 3. 单个 URL 或 data URI 字符串: 'https://...' 或 'data:image/...'
// 4. 空字符串: ''

export function parseProductImages(images: string | null | undefined): string[] {
  if (!images || images.trim() === '') return [];

  // 尝试 JSON 解析
  if (images.trim().startsWith('[')) {
    try {
      const parsed = JSON.parse(images);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.filter((img: any) => typeof img === 'string' && img.length > 0);
      }
    } catch {
      // 解析失败，继续走下面的逻辑
    }
  }

  // 逗号分隔
  if (images.includes(',')) {
    const parts = images.split(',').map(s => s.trim()).filter(Boolean);
    if (parts.length > 0) return parts;
  }

  // 单个 URL 或 data URI
  return [images.trim()];
}
