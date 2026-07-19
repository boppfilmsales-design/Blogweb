// 统一的产品类型定义（与数据库 schema 对齐）
export interface Product {
  id: string;
  slug: string;
  nameEn: string;
  nameZh: string;
  category: string;
  descriptionEn: string;
  descriptionZh: string;
  thickness: string;
  width: string;
  length: string;
  weight: string;
  color: string;
  material: string;
  featuresEn: string;   // JSON string array
  featuresZh: string;   // JSON string array
  applicationsEn: string; // JSON string array
  applicationsZh: string; // JSON string array
  certifications: string; // JSON string array
  images: string;       // comma-separated URLs
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
