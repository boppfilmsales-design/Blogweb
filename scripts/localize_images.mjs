// localize_images.mjs
// 读取最终产品 JSON（products_final.json），把图片本地化到 public/products/。
// - 本地路径 images/xxx.jpg  -> 从 旧站目录 复制
// - 外链 telegraph-image...  -> 下载
// 输出改写后的 products_final.json（images 改为 /products/xxx.jpg），并报告体积。
// 运行： node scripts/localize_images.mjs
// 可选 env: OLD_SITE=D:/path/web-东渐网站源码
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve('.');
const oldSite = process.env.OLD_SITE
  || 'C:\\Users\\DELL\\.qwenpaw\\workspaces\\default\\web-东渐网站源码';

const finalPath = path.join(root, 'scripts', 'products_final.json');
const products = JSON.parse(fs.readFileSync(finalPath, 'utf-8'));
const outDir = path.join(root, 'public', 'products');
fs.mkdirSync(outDir, { recursive: true });

const https = (await import('https')).default;
const http = (await import('http')).default;

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) { reject(new Error('HTTP ' + res.statusCode)); return; }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(dest)));
    });
    req.on('error', reject);
  });
}

function sanitize(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_');
}

// 在旧站多个可能目录里找文件
function findInOldSite(name) {
  const candidates = [
    path.join(oldSite, 'images', name),
    path.join(oldSite, 'pic', 'big', name),
    path.join(oldSite, 'huiguer.com', 'images', name),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

let totalBytes = 0;
let copied = 0, downloaded = 0, skipped = 0, failed = 0;

for (const p of products) {
  if (!p.images) { skipped++; continue; }
  const imgs = String(p.images).split(/[|,]/).map(s => s.trim()).filter(Boolean);
  const newPaths = [];
  for (const img of imgs) {
    try {
      let finalName;
      if (img.startsWith('http')) {
        finalName = sanitize(img.split('/').pop().split('?')[0]) || (`${p.slug}.jpg`);
        const dest = path.join(outDir, finalName);
        if (!fs.existsSync(dest)) {
          await download(img, dest);
          downloaded++;
        } else downloaded++;
      } else {
        // 本地路径：images/xxx.jpg -> 取文件名
        finalName = sanitize(path.basename(img));
        const src = findInOldSite(path.basename(img));
        const dest = path.join(outDir, finalName);
        if (src && !fs.existsSync(dest)) {
          fs.copyFileSync(src, dest);
          copied++;
        } else if (fs.existsSync(dest)) {
          copied++;
        } else {
          skipped++;
          continue;
        }
      }
      const st = fs.statSync(path.join(outDir, finalName));
      totalBytes += st.size;
      newPaths.push('/products/' + finalName);
    } catch (e) {
      failed++;
      console.error('  失败', img, e.message);
    }
  }
  p.images = newPaths.join(',');
}

fs.writeFileSync(finalPath, JSON.stringify(products, null, 2), 'utf-8');
console.log(`复制本地: ${copied}, 下载外链: ${downloaded}, 跳过: ${skipped}, 失败: ${failed}`);
console.log(`public/products 总体积: ${(totalBytes / 1024 / 1024).toFixed(1)} MB`);
if (totalBytes > 100 * 1024 * 1024) {
  console.warn('⚠️ 超过 Vercel 100MB 代码包限制！需精简图片。');
}
