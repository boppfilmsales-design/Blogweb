export interface Product {
  id: string;
  slug: string;
  name: {
    zh: string;
    en: string;
    ar: string;
    es: string;
    pt: string;
  };
  category: string;
  description: {
    zh: string;
    en: string;
    ar: string;
    es: string;
    pt: string;
  };
  specifications: {
    thickness: string;
    width: string;
    length: string;
    weight: string;
    color: string;
    material: string;
  };
  features: {
    zh: string[];
    en: string[];
    ar: string[];
    es: string[];
    pt: string[];
  };
  applications: {
    zh: string[];
    en: string[];
    ar: string[];
    es: string[];
    pt: string[];
  };
  certifications: string[];
  images: string[];
  featured: boolean;
}

export const products: Product[] = [
  // ==================== BOPP 光膜系列 ====================
  {
    id: '1', slug: 'bopp-gloss-15', name: { zh: 'BOPP光膜 15微米', en: 'BOPP Gloss Film 15 Micron', ar: 'فيلم BOPP لامع 15 ميكرون', es: 'Película BOPP Brillante 15 Micras', pt: 'Filme BOPP Brilhante 15 Microns' }, category: 'bopp-gloss',
    description: { zh: '超薄BOPP光膜，厚度15微米，具有卓越的透明度和光泽度。适用于高速印刷和精密包装。', en: 'Ultra-thin BOPP gloss film with 15 micron thickness, featuring exceptional transparency and gloss. Ideal for high-speed printing and precision packaging.', ar: 'فيلم BOPP لامع فائق الرقة بسماكة 15 ميكرون، يتميز بشفافية وتلألؤ استثنائيين.', es: 'Película BOPP brillante ultra delgada con grosor de 15 micras.', pt: 'Filme BOPP brilhante ultra-fino com espessura de 15 micrômetros.' },
    specifications: { thickness: '15 microns', width: '200-1200mm', length: '3000-6000m', weight: 'Customized', color: 'Transparent', material: 'Polypropylene' },
    features: { zh: ['超薄设计', '高透明度', '优异光泽度', '高速印刷适用'], en: ['Ultra-thin design', 'High transparency', 'Excellent gloss', 'High-speed printing'], ar: ['تصميم فائق الرقة', 'شفافية عالية', 'لمعان ممتاز', 'طباعة عالية السرعة'], es: ['Diseño ultra delgado', 'Alta transparencia', 'Excelente brillo', 'Impresión de alta velocidad'], pt: ['Design ultra-fino', 'Alta transparência', 'Excelente brilho', 'Impressão de alta velocidade'] },
    applications: { zh: ['食品包装', '印刷覆膜', '标签制作', '礼品包装'], en: ['Food packaging', 'Printing lamination', 'Label making', 'Gift wrapping'], ar: ['تغليف المواد الغذائية', 'تصفيح الطباعة', 'صنع الملصقات', 'تغليف الهدايا'], es: ['Empaquetado de alimentos', 'Laminación de impresión', 'Fabricación de etiquetas', 'Envoltura de regalos'], pt: ['Embalagem de alimentos', 'Laminação de impressão', 'Fabricação de etiquetas', 'Embalagem de presentes'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/bopp-gloss-15.jpg'], featured: true
  },
  {
    id: '2', slug: 'bopp-gloss-18', name: { zh: 'BOPP光膜 18微米', en: 'BOPP Gloss Film 18 Micron', ar: 'فيلم BOPP لامع 18 ميكرون', es: 'Película BOPP Brillante 18 Micras', pt: 'Filme BOPP Brilhante 18 Microns' }, category: 'bopp-gloss',
    description: { zh: '标准BOPP光膜，厚度18微米，平衡了透明度、强度和印刷适性。', en: 'Standard BOPP gloss film with 18 micron thickness, balancing transparency, strength and printability.', ar: 'فيلم BOPP لامع قياسي بسماكة 18 ميكرون، يوازن بين الشفافية والقوة وقابلية الطباعة.', es: 'Película BOPP brillante estándar con grosor de 18 micras.', pt: 'Filme BOPP brilhante padrão com espessura de 18 micrômetros.' },
    specifications: { thickness: '18 microns', width: '200-1400mm', length: '2500-5000m', weight: 'Customized', color: 'Transparent', material: 'Polypropylene' },
    features: { zh: ['标准厚度', '平衡性能', '良好透明度', '优异印刷适性'], en: ['Standard thickness', 'Balanced performance', 'Good transparency', 'Excellent printability'], ar: ['سماكة قياسية', 'أداء متوازن', 'شفافية جيدة', 'قابلية طباعة ممتازة'], es: ['Grosor estándar', 'Rendimiento equilibrado', 'Buena transparencia', 'Imprimibilidad excelente'], pt: ['Espessura padrão', 'Desempenho equilibrado', 'Boa transparência', 'Imprimibilidade excelente'] },
    applications: { zh: ['食品包装', '日用品包装', '印刷覆膜', '标签制作'], en: ['Food packaging', 'Daily necessities packaging', 'Printing lamination', 'Label making'], ar: ['تغليف المواد الغذائية', 'تغليف الضروريات اليومية', 'تصفيح الطباعة', 'صنع الملصقات'], es: ['Empaquetado de alimentos', 'Empaquetado de artículos de uso diario', 'Laminación de impresión', 'Fabricación de etiquetas'], pt: ['Embalagem de alimentos', 'Embalagem de artigos de uso diário', 'Laminação de impressão', 'Fabricação de etiquetas'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/bopp-gloss-18.jpg'], featured: true
  },
  {
    id: '3', slug: 'bopp-gloss-20', name: { zh: 'BOPP光膜 20微米', en: 'BOPP Gloss Film 20 Micron', ar: 'فيلم BOPP لامع 20 ميكرون', es: 'Película BOPP Brillante 20 Micras', pt: 'Filme BOPP Brilhante 20 Microns' }, category: 'bopp-gloss',
    description: { zh: '中厚BOPP光膜，厚度20微米，提供更高的强度和耐久性。', en: 'Medium-thick BOPP gloss film with 20 micron thickness, providing higher strength and durability.', ar: 'فيلم BOPP لامع متوسط السماكة بسماكة 20 ميكرون، يوفر قوة ومتانة أعلى.', es: 'Película BOPP brillante de grosor medio con 20 micras de espesor.', pt: 'Filme BOPP brilhante de espessura média com 20 micrômetros.' },
    specifications: { thickness: '20 microns', width: '200-1600mm', length: '2000-4000m', weight: 'Customized', color: 'Transparent', material: 'Polypropylene' },
    features: { zh: ['中厚设计', '高强度', '良好耐久性', '优异印刷适性'], en: ['Medium-thick design', 'High strength', 'Good durability', 'Excellent printability'], ar: ['تصميم متوسط السماكة', 'قوة عالية', 'متانة جيدة', 'قابلية طباعة ممتازة'], es: ['Diseño de grosor medio', 'Alta resistencia', 'Buena durabilidad', 'Imprimibilidad excelente'], pt: ['Design de espessura média', 'Alta resistência', 'Boa durabilidade', 'Imprimibilidade excelente'] },
    applications: { zh: ['食品包装', '日用品包装', '印刷覆膜', '标签制作', '工业包装'], en: ['Food packaging', 'Daily necessities packaging', 'Printing lamination', 'Label making', 'Industrial packaging'], ar: ['تغليف المواد الغذائية', 'تغليف الضروريات اليومية', 'تصفيح الطباعة', 'صنع الملصقات', 'التغليف الصناعي'], es: ['Empaquetado de alimentos', 'Empaquetado de artículos de uso diario', 'Laminación de impresión', 'Fabricación de etiquetas', 'Empaquetado industrial'], pt: ['Embalagem de alimentos', 'Embalagem de artigos de uso diário', 'Laminação de impressão', 'Fabricação de etiquetas', 'Embalagem industrial'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/bopp-gloss-20.jpg'], featured: false
  },
  {
    id: '4', slug: 'bopp-gloss-25', name: { zh: 'BOPP光膜 25微米', en: 'BOPP Gloss Film 25 Micron', ar: 'فيلم BOPP لامع 25 ميكرون', es: 'Película BOPP Brillante 25 Micras', pt: 'Filme BOPP Brilhante 25 Microns' }, category: 'bopp-gloss',
    description: { zh: '厚型BOPP光膜，厚度25微米，提供最佳的强度和刚性。', en: 'Thick BOPP gloss film with 25 micron thickness, providing optimal strength and rigidity.', ar: 'فيلم BOPP لامع سميك بسماكة 25 ميكرون، يوفر القوة والصلابة المثلى.', es: 'Película BOPP brillante gruesa con 25 micras de espesor.', pt: 'Filme BOPP brilhante grosso com 25 micrômetros de espessura.' },
    specifications: { thickness: '25 microns', width: '200-1600mm', length: '1500-3500m', weight: 'Customized', color: 'Transparent', material: 'Polypropylene' },
    features: { zh: ['厚型设计', '最佳强度', '高刚性', '优异印刷适性'], en: ['Thick design', 'Optimal strength', 'High rigidity', 'Excellent printability'], ar: ['تصميم سميك', 'قوة مثلى', 'صلابة عالية', 'قابلية طباعة ممتازة'], es: ['Diseño grueso', 'Resistencia óptima', 'Alta rigidez', 'Imprimibilidad excelente'], pt: ['Design grosso', 'Resistência ideal', 'Alta rigidez', 'Imprimibilidade excelente'] },
    applications: { zh: ['重型包装', '高品质印刷', '工业包装', '建筑材料包装'], en: ['Heavy-duty packaging', 'High-quality printing', 'Industrial packaging', 'Building materials packaging'], ar: ['تغليف ثقيل', 'طباعة عالية الجودة', 'تغليف صناعي', 'تغليف مواد البناء'], es: ['Empaquetado de alta resistencia', 'Impresión de alta calidad', 'Empaquetado industrial', 'Empaquetado de materiales de construcción'], pt: ['Embalagem pesada', 'Impressão de alta qualidade', 'Embalagem industrial', 'Embalagem de materiais de construção'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/bopp-gloss-25.jpg'], featured: false
  },
  {
    id: '5', slug: 'bopp-gloss-30', name: { zh: 'BOPP光膜 30微米', en: 'BOPP Gloss Film 30 Micron', ar: 'فيلم BOPP لامع 30 ميكرون', es: 'Película BOPP Brillante 30 Micras', pt: 'Filme BOPP Brilhante 30 Microns' }, category: 'bopp-gloss',
    description: { zh: '超厚BOPP光膜，厚度30微米，提供最高的强度和耐久性。', en: 'Ultra-thick BOPP gloss film with 30 micron thickness, providing maximum strength and durability.', ar: 'فيلم BOPP لامع فائق السماكة بسماكة 30 ميكرون، يوفر أقصى قوة ومتانة.', es: 'Película BOPP brillante ultra gruesa con 30 micras de espesor.', pt: 'Filme BOPP brilhante ultra-grosso com 30 micrômetros de espessura.' },
    specifications: { thickness: '30 microns', width: '200-1600mm', length: '1000-3000m', weight: 'Customized', color: 'Transparent', material: 'Polypropylene' },
    features: { zh: ['超厚设计', '最高强度', '最大耐久性', '工业级品质'], en: ['Ultra-thick design', 'Maximum strength', 'Maximum durability', 'Industrial grade quality'], ar: ['تصميم فائق السماكة', 'أقصى قوة', 'أقصى متانة', 'جودة صناعية'], es: ['Diseño ultra grueso', 'Máxima resistencia', 'Máxima durabilidad', 'Calidad industrial'], pt: ['Design ultra-grosso', 'Máxima resistência', 'Máxima durabilidade', 'Qualidade industrial'] },
    applications: { zh: ['重型工业包装', '建筑材料包装', '电子产品包装', '特殊应用'], en: ['Heavy industrial packaging', 'Building materials packaging', 'Electronics packaging', 'Special applications'], ar: ['تغليف صناعي ثقيل', 'تغليف مواد البناء', 'تغليف الإلكترونيات', 'تطبيقات خاصة'], es: ['Empaquetado industrial pesado', 'Empaquetado de materiales de construcción', 'Empaquetado de electrónicos', 'Aplicaciones especiales'], pt: ['Embalagem industrial pesada', 'Embalagem de materiais de construção', 'Embalagem de eletrônicos', 'Aplicações especiais'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/bopp-gloss-30.jpg'], featured: false
  },

  // ==================== BOPP 哑膜系列 ====================
  {
    id: '6', slug: 'bopp-matte-18', name: { zh: 'BOPP哑膜 18微米', en: 'BOPP Matte Film 18 Micron', ar: 'فيلم BOPP غير لامع 18 ميكرون', es: 'Película BOPP Mate 18 Micras', pt: 'Filme BOPP Fosco 18 Microns' }, category: 'bopp-matte',
    description: { zh: '标准BOPP哑膜，厚度18微米，提供柔和的哑光效果和良好的印刷适性。', en: 'Standard BOPP matte film with 18 micron thickness, providing soft matte finish and good printability.', ar: 'فيلم BOPP غير لامع قياسي بسماكة 18 ميكرون، يوفر تشطيب غير لامع ناعم وقابلية طباعة جيدة.', es: 'Película BOPP mate estándar con 18 micras de espesor.', pt: 'Filme BOPP fosco padrão com 18 micrômetros de espessura.' },
    specifications: { thickness: '18 microns', width: '200-1400mm', length: '2500-5000m', weight: 'Customized', color: 'Matte White', material: 'Polypropylene' },
    features: { zh: ['标准厚度', '柔和哑光效果', '良好印刷适性', '抗静电性能'], en: ['Standard thickness', 'Soft matte effect', 'Good printability', 'Anti-static properties'], ar: ['سماكة قياسية', 'تأثير غير لامع ناعم', 'قابلية طباعة جيدة', 'خصائص مضادة للكهرباء الساكنة'], es: ['Grosor estándar', 'Efecto mate suave', 'Buena imprimibilidad', 'Propiedades antiestáticas'], pt: ['Espessura padrão', 'Efeito fosco suave', 'Boa imprimibilidade', 'Propriedades antiestáticas'] },
    applications: { zh: ['高端食品包装', '化妆品包装', '药品包装', '标签制作'], en: ['High-end food packaging', 'Cosmetic packaging', 'Pharmaceutical packaging', 'Label making'], ar: ['تغليف المواد الغذائية عالية الجودة', 'تغليف مستحضرات التجميل', 'تغليف المستحضرات الصيدلانية', 'صنع الملصقات'], es: ['Empaquetado de alimentos de alta gama', 'Empaquetado de cosméticos', 'Empaquetado farmacéutico', 'Fabricación de etiquetas'], pt: ['Embalagem de alimentos de alta qualidade', 'Embalagem de cosméticos', 'Embalagem farmacêutica', 'Fabricação de etiquetas'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/bopp-matte-18.jpg'], featured: true
  },
  {
    id: '7', slug: 'bopp-matte-20', name: { zh: 'BOPP哑膜 20微米', en: 'BOPP Matte Film 20 Micron', ar: 'فيلم BOPP غير لامع 20 ميكرون', es: 'Película BOPP Mate 20 Micras', pt: 'Filme BOPP Fosco 20 Microns' }, category: 'bopp-matte',
    description: { zh: '中厚BOPP哑膜，厚度20微米，提供更高的强度和良好的哑光效果。', en: 'Medium-thick BOPP matte film with 20 micron thickness, providing higher strength and good matte finish.', ar: 'فيلم BOPP غير لامع متوسط السماكة بسماكة 20 ميكرون، يوفر قوة أعلى وتأثير غير لامع جيد.', es: 'Película BOPP mate de grosor medio con 20 micras de espesor.', pt: 'Filme BOPP fosco de espessura média com 20 micrômetros.' },
    specifications: { thickness: '20 microns', width: '200-1600mm', length: '2000-4000m', weight: 'Customized', color: 'Matte White', material: 'Polypropylene' },
    features: { zh: ['中厚设计', '高強度', '良好哑光效果', '优异印刷适性'], en: ['Medium-thick design', 'High strength', 'Good matte effect', 'Excellent printability'], ar: ['تصميم متوسط السماكة', 'قوة عالية', 'تأثير غير لامع جيد', 'قابلية طباعة ممتازة'], es: ['Diseño de grosor medio', 'Alta resistencia', 'Buen efecto mate', 'Imprimibilidad excelente'], pt: ['Design de espessura média', 'Alta resistência', 'Bom efeito fosco', 'Imprimibilidade excelente'] },
    applications: { zh: ['高端食品包装', '化妆品包装', '药品包装', '标签制作'], en: ['High-end food packaging', 'Cosmetic packaging', 'Pharmaceutical packaging', 'Label making'], ar: ['تغليف المواد الغذائية عالية الجودة', 'تغليف مستحضرات التجميل', 'تغليف المستحضرات الصيدلانية', 'صنع الملصقات'], es: ['Empaquetado de alimentos de alta gama', 'Empaquetado de cosméticos', 'Empaquetado farmacéutico', 'Fabricación de etiquetas'], pt: ['Embalagem de alimentos de alta qualidade', 'Embalagem de cosméticos', 'Embalagem farmacêutica', 'Fabricação de etiquetas'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/bopp-matte-20.jpg'], featured: false
  },
  {
    id: '8', slug: 'bopp-matte-25', name: { zh: 'BOPP哑膜 25微米', en: 'BOPP Matte Film 25 Micron', ar: 'فيلم BOPP غير لامع 25 ميكرون', es: 'Película BOPP Mate 25 Micras', pt: 'Filme BOPP Fosco 25 Microns' }, category: 'bopp-matte',
    description: { zh: '厚型BOPP哑膜，厚度25微米，提供最佳的强度和哑光效果。', en: 'Thick BOPP matte film with 25 micron thickness, providing optimal strength and matte finish.', ar: 'فيلم BOPP غير لامع سميك بسماكة 25 ميكرون، يوفر القوة والتأثير غير لامع المثلى.', es: 'Película BOPP mate gruesa con 25 micras de espesor.', pt: 'Filme BOPP fosco grosso com 25 micrômetros de espessura.' },
    specifications: { thickness: '25 microns', width: '200-1600mm', length: '1500-3500m', weight: 'Customized', color: 'Matte White', material: 'Polypropylene' },
    features: { zh: ['厚型设计', '最佳强度', '优异哑光效果', '高品质印刷适用'], en: ['Thick design', 'Optimal strength', 'Excellent matte effect', 'High-quality printing'], ar: ['تصميم سميك', 'قوة مثلى', 'تأثير غير لامع ممتاز', 'طباعة عالية الجودة'], es: ['Diseño grueso', 'Resistencia óptima', 'Excelente efecto mate', 'Impresión de alta calidad'], pt: ['Design grosso', 'Resistência ideal', 'Excelente efeito fosco', 'Impressão de alta qualidade'] },
    applications: { zh: ['重型包装', '高品质印刷', '工业包装', '建筑材料包装'], en: ['Heavy-duty packaging', 'High-quality printing', 'Industrial packaging', 'Building materials packaging'], ar: ['تغليف ثقيل', 'طباعة عالية الجودة', 'تغليف صناعي', 'تغليف مواد البناء'], es: ['Empaquetado de alta resistencia', 'Impresión de alta calidad', 'Empaquetado industrial', 'Empaquetado de materiales de construcción'], pt: ['Embalagem pesada', 'Impressão de alta qualidade', 'Embalagem industrial', 'Embalagem de materiais de construção'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/bopp-matte-25.jpg'], featured: false
  },
  {
    id: '9', slug: 'bopp-matte-30', name: { zh: 'BOPP哑膜 30微米', en: 'BOPP Matte Film 30 Micron', ar: 'فيلم BOPP غير لامع 30 ميكرون', es: 'Película BOPP Mate 30 Micras', pt: 'Filme BOPP Fosco 30 Microns' }, category: 'bopp-matte',
    description: { zh: '超厚BOPP哑膜，厚度30微米，提供最高的强度和最佳的哑光效果。', en: 'Ultra-thick BOPP matte film with 30 micron thickness, providing maximum strength and optimal matte finish.', ar: 'فيلم BOPP غير لامع فائق السماكة بسماكة 30 ميكرون، يوفر أقصى قوة وتأثير غير لامع مثالي.', es: 'Película BOPP mate ultra gruesa con 30 micras de espesor.', pt: 'Filme BOPP fosco ultra-grosso com 30 micrômetros de espessura.' },
    specifications: { thickness: '30 microns', width: '200-1600mm', length: '1000-3000m', weight: 'Customized', color: 'Matte White', material: 'Polypropylene' },
    features: { zh: ['超厚设计', '最高强度', '最佳哑光效果', '工业级品质'], en: ['Ultra-thick design', 'Maximum strength', 'Optimal matte