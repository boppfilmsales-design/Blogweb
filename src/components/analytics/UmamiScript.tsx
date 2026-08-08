'use client';

import { useEffect } from 'react';

interface UmamiScriptProps {
  /** Umami 实例域名或 IP（含端口），如 https://umami.example.com 或 http://localhost:3000 */
  src: string;
  /** 网站 ID（从 Umami 后台获取） */
  websiteId: string;
  /** 是否启用自动追踪（默认 true） */
  autoTrack?: boolean;
  /** 是否尊重 Do Not Track（默认 true） */
  respectDNT?: boolean;
  /** 自定义数据属性 */
  dataAttributes?: Record<string, string>;
}

/**
 * Umami 分析脚本组件
 * 
 * 使用方式：
 * 1. 在 Umami 后台创建网站，获取 website-id
 * 2. 在 layout.tsx 中引入：
 *    <UmamiScript src="https://your-umami-domain.com" websiteId="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />
 */
export default function UmamiScript({
  src,
  websiteId,
  autoTrack = true,
  respectDNT = true,
  dataAttributes = {},
}: UmamiScriptProps) {
  useEffect(() => {
    // 避免 SSR 重复注入
    if (typeof window === 'undefined') return;

    // 检查是否已加载
    if (document.querySelector(`script[data-website-id="${websiteId}"]`)) return;

    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = `${src}/script.js`;
    script.dataset.websiteId = websiteId;
    script.dataset.autoTrack = String(autoTrack);
    script.dataset.respectDNT = String(respectDNT);

    // 自定义数据属性
    Object.entries(dataAttributes).forEach(([key, value]) => {
      script.dataset[key] = value;
    });

    document.head.appendChild(script);

    return () => {
      // 卸载时移除脚本（可选）
      const existing = document.querySelector(`script[data-website-id="${websiteId}"]`);
      if (existing) existing.remove();
    };
  }, [src, websiteId, autoTrack, respectDNT, dataAttributes]);

  return null;
}