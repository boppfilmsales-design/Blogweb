import { products } from '@/data/products';

export const exportProductsToJSON = () => {
  const dataStr = JSON.stringify(products, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

  const exportFileDefaultName = 'bopp-products.json';

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

export const exportProductsToCSV = () => {
  const headers = [
    'ID',
    'Slug',
    'Name (EN)',
    'Name (ZH)',
    'Category',
    'Description (EN)',
    'Description (ZH)',
    'Thickness',
    'Width',
    'Length',
    'Weight',
    'Color',
    'Material',
    'Features (EN)',
    'Features (ZH)',
    'Applications (EN)',
    'Applications (ZH)',
    'Certifications',
    'Featured'
  ];

  const csvContent = [
    headers.join(','),
    ...products.map(product => [
      product.id,
      product.slug,
      `"${product.name.en}"`,
      `"${product.name.zh}"`,
      product.category,
      `"${product.description.en}"`,
      `"${product.description.zh}"`,
      product.specifications.thickness,
      product.specifications.width,
      product.specifications.length,
      product.specifications.weight,
      product.specifications.color,
      product.specifications.material,
      `"${product.features.en.join('; ')}"`,
      `"${product.features.zh.join('; ')}"`,
      `"${product.applications.en.join('; ')}"`,
      `"${product.applications.zh.join('; ')}"`,
      `"${product.certifications.join('; ')}"`,
      product.featured ? 'Yes' : 'No'
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'bopp-products.csv');
  link.click();
  URL.revokeObjectURL(url);
};

export const importProductsFromJSON = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};
