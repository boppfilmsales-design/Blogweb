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
    features: { zh: ['超厚设计', '最高强度', '最佳哑光效果', '工业级品质'], en: ['Ultra-thick design', 'Maximum strength', 'Optimal matte effect', 'Industrial grade quality'], ar: ['تصميم فائق السماكة', 'أقصى قوة', 'تأثير غير لامع مثالي', 'جودة صناعية'], es: ['Diseño ultra grueso', 'Máxima resistencia', 'Acabado mate óptimo', 'Calidad industrial'], pt: ['Design ultra-grosso', 'Máxima resistência', 'Acabamento fosco ideal', 'Qualidade industrial'] },
    applications: { zh: ['重型工业包装', '建筑材料包装', '电子产品包装', '特殊应用'], en: ['Heavy industrial packaging', 'Building materials packaging', 'Electronics packaging', 'Special applications'], ar: ['تغليف صناعي ثقيل', 'تغليف مواد البناء', 'تغليف الإلكترونيات', 'تطبيقات خاصة'], es: ['Empaquetado industrial pesado', 'Empaquetado de materiales de construcción', 'Empaquetado de electrónicos', 'Aplicaciones especiales'], pt: ['Embalagem industrial pesada', 'Embalagem de materiais de construção', 'Embalagem de eletrônicos', 'Aplicações especiais'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/bopp-matte-30.jpg'], featured: false
  },

  // ==================== BOPS 薄膜系列 ====================
  {
    id: '40', slug: 'bops-15', name: { zh: 'BOPS薄膜 15微米', en: 'BOPS Film 15 Micron', ar: 'فيلم BOPS 15 ميكرون', es: 'Película BOPS 15 Micras', pt: 'Filme BOPS 15 Microns' }, category: 'bops',
    description: { zh: '超薄BOPS薄膜，具有良好的透明度和收缩性能。适用于热收缩包装应用。', en: 'Ultra-thin BOPS film with good transparency and shrinkage properties. Suitable for heat shrink packaging applications.', ar: 'فيلم BOPS فائق الرقة بشفافية جيدة وخصائص انكماش.', es: 'Película BOPS ultra delgada con buena transparencia y propiedades de contracción.', pt: 'Filme BOPS ultra-fino com boa transparência e propriedades de contração.' },
    specifications: { thickness: '15 microns', width: '200-1200mm', length: '3000-6000m', weight: 'Customized', color: 'Transparent', material: 'Polystyrene' },
    features: { zh: ['超薄设计', '良好透明度', '收缩性能好', '印刷适性佳'], en: ['Ultra-thin design', 'Good transparency', 'Good shrinkage', 'Good printability'], ar: ['تصميم فائق الرقة', 'شفافية جيدة', 'انكماش جيد', 'قابلية طباعة جيدة'], es: ['Diseño ultra delgado', 'Buena transparencia', 'Buena contracción', 'Buena imprimibilidad'], pt: ['Design ultra-fino', 'Boa transparência', 'Boa contração', 'Boa imprimibilidade'] },
    applications: { zh: ['热收缩包装', '标签制作', '食品包装', '日用品包装'], en: ['Heat shrink packaging', 'Label making', 'Food packaging', 'Daily necessities packaging'], ar: ['تغليف بالانكماش الحراري', 'صنع الملصقات', 'تغليف المواد الغذائية', 'تغليف الضروريات اليومية'], es: ['Empaquetado termoencogible', 'Fabricación de etiquetas', 'Empaquetado de alimentos', 'Empaquetado de artículos de uso diario'], pt: ['Embalagem termocontrátil', 'Fabricação de etiquetas', 'Embalagem de alimentos', 'Embalagem de artigos de uso diário'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/bops-15.jpg'], featured: true
  },
  {
    id: '41', slug: 'bops-18', name: { zh: 'BOPS薄膜 18微米', en: 'BOPS Film 18 Micron', ar: 'فيلم BOPS 18 ميكرون', es: 'Película BOPS 18 Micras', pt: 'Filme BOPS 18 Microns' }, category: 'bops',
    description: { zh: '标准BOPS薄膜，平衡了透明度和收缩性能。适用于多种热收缩包装应用。', en: 'Standard BOPS film balancing transparency and shrinkage properties. Suitable for various heat shrink packaging applications.', ar: 'فيلم BOPS قياسي يوازن بين الشفافية وخصائص الانكماش.', es: 'Película BOPS estándar equilibrando transparencia y propiedades de contracción.', pt: 'Filme BOPS padrão equilibrando transparência e propriedades de contração.' },
    specifications: { thickness: '18 microns', width: '200-1400mm', length: '2500-5000m', weight: 'Customized', color: 'Transparent', material: 'Polystyrene' },
    features: { zh: ['标准厚度', '平衡性能', '良好透明度', '收缩性能好'], en: ['Standard thickness', 'Balanced performance', 'Good transparency', 'Good shrinkage'], ar: ['سماكة قياسية', 'أداء متوازن', 'شفافية جيدة', 'انكماش جيد'], es: ['Grosor estándar', 'Rendimiento equilibrado', 'Buena transparencia', 'Buena contracción'], pt: ['Espessura padrão', 'Desempenho equilibrado', 'Boa transparência', 'Boa contração'] },
    applications: { zh: ['热收缩包装', '标签制作', '食品包装', '日用品包装'], en: ['Heat shrink packaging', 'Label making', 'Food packaging', 'Daily necessities packaging'], ar: ['تغليف بالانكماش الحراري', 'صنع الملصقات', 'تغليف المواد الغذائية', 'تغليف الضروريات اليومية'], es: ['Empaquetado termoencogible', 'Fabricación de etiquetas', 'Empaquetado de alimentos', 'Empaquetado de artículos de uso diario'], pt: ['Embalagem termocontrátil', 'Fabricação de etiquetas', 'Embalagem de alimentos', 'Embalagem de artigos de uso diário'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/bops-18.jpg'], featured: false
  },
  {
    id: '42', slug: 'bops-20', name: { zh: 'BOPS薄膜 20微米', en: 'BOPS Film 20 Micron', ar: 'فيلم BOPS 20 ميكرون', es: 'Película BOPS 20 Micras', pt: 'Filme BOPS 20 Microns' }, category: 'bops',
    description: { zh: '中厚BOPS薄膜，提供更高的强度和收缩性能。适用于要求较高的热收缩包装应用。', en: 'Medium-thick BOPS film with higher strength and shrinkage properties. Suitable for demanding heat shrink packaging applications.', ar: 'فيلم BOPS متوسط السماكة بقوة وانكماش أعلى.', es: 'Película BOPS de grosor medio con mayor resistencia y contracción.', pt: 'Filme BOPS de espessura média com maior resistência e contração.' },
    specifications: { thickness: '20 microns', width: '200-1600mm', length: '2000-4000m', weight: 'Customized', color: 'Transparent', material: 'Polystyrene' },
    features: { zh: ['中厚设计', '高強度', '收缩性能好', '印刷适性佳'], en: ['Medium-thick design', 'High strength', 'Good shrinkage', 'Good printability'], ar: ['تصميم متوسط السماكة', 'قوة عالية', 'انكماش جيد', 'قابلية طباعة جيدة'], es: ['Diseño de grosor medio', 'Alta resistencia', 'Buena contracción', 'Buena imprimibilidad'], pt: ['Design de espessura média', 'Alta resistência', 'Boa contração', 'Boa imprimibilidade'] },
    applications: { zh: ['热收缩包装', '标签制作', '食品包装', '日用品包装'], en: ['Heat shrink packaging', 'Label making', 'Food packaging', 'Daily necessities packaging'], ar: ['تغليف بالانكماش الحراري', 'صنع الملصقات', 'تغليف المواد الغذائية', 'تغليف الضروريات اليومية'], es: ['Empaquetado termoencogible', 'Fabricación de etiquetas', 'Empaquetado de alimentos', 'Empaquetado de artículos de uso diario'], pt: ['Embalagem termocontrátil', 'Fabricação de etiquetas', 'Embalagem de alimentos', 'Embalagem de artigos de uso diário'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/bops-20.jpg'], featured: false
  },
  {
    id: '43', slug: 'bops-25', name: { zh: 'BOPS薄膜 25微米', en: 'BOPS Film 25 Micron', ar: 'فيلم BOPS 25 ميكرون', es: 'Película BOPS 25 Micras', pt: 'Filme BOPS 25 Microns' }, category: 'bops',
    description: { zh: '厚型BOPS薄膜，提供最佳的强度和收缩性能。适用于重型热收缩包装应用。', en: 'Thick BOPS film with optimal strength and shrinkage properties. Suitable for heavy-duty heat shrink packaging applications.', ar: 'فيلم BOPS سميك بقوة وانكماش مثلى. مناسب لتطبيقات التغليف بالانكماش الحراري الثقيل.', es: 'Película BOPS gruesa con resistencia y contracción óptimas.', pt: 'Filme BOPS grosso com resistência e contração ideais.' },
    specifications: { thickness: '25 microns', width: '200-1600mm', length: '1500-3500m', weight: 'Customized', color: 'Transparent', material: 'Polystyrene' },
    features: { zh: ['厚型设计', '最佳强度', '收缩性能好', '印刷适性佳'], en: ['Thick design', 'Optimal strength', 'Good shrinkage', 'Good printability'], ar: ['تصميم سميك', 'قوة مثلى', 'انكماش جيد', 'قابلية طباعة جيدة'], es: ['Diseño grueso', 'Resistencia óptima', 'Buena contracción', 'Buena imprimibilidad'], pt: ['Design grosso', 'Resistência ideal', 'Boa contração', 'Boa imprimibilidade'] },
    applications: { zh: ['重型热收缩包装', '工业包装', '建筑材料包装', '特殊应用'], en: ['Heavy-duty heat shrink packaging', 'Industrial packaging', 'Building materials packaging', 'Special applications'], ar: ['تغليف بالانكماش الحراري الثقيل', 'تغليف صناعي', 'تغليف مواد البناء', 'تطبيقات خاصة'], es: ['Empaquetado termoencogible de alta resistencia', 'Empaquetado industrial', 'Empaquetado de materiales de construcción', 'Aplicaciones especiales'], pt: ['Embalagem termocontrátil pesada', 'Embalagem industrial', 'Embalagem de materiais de construção', 'Aplicações especiais'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/bops-25.jpg'], featured: false
  },
  {
    id: '44', slug: 'bops-30', name: { zh: 'BOPS薄膜 30微米', en: 'BOPS Film 30 Micron', ar: 'فيلم BOPS 30 ميكرون', es: 'Película BOPS 30 Micras', pt: 'Filme BOPS 30 Microns' }, category: 'bops',
    description: { zh: '超厚BOPS薄膜，提供最高的强度和最佳的收缩性能。适用于重型工业包装和特殊应用。', en: 'Ultra-thick BOPS film with maximum strength and optimal shrinkage properties. Suitable for heavy industrial packaging and special applications.', ar: 'فيلم BOPS فائق السماكة بأقصى قوة وانكماش مثالي.', es: 'Película BOPS ultra gruesa con máxima resistencia y contracción óptima.', pt: 'Filme BOPS ultra-grosso com máxima resistência e contração ideal.' },
    specifications: { thickness: '30 microns', width: '200-1600mm', length: '1000-3000m', weight: 'Customized', color: 'Transparent', material: 'Polystyrene' },
    features: { zh: ['超厚设计', '最高强度', '收缩性能好', '工业级品质'], en: ['Ultra-thick design', 'Maximum strength', 'Good shrinkage', 'Industrial grade quality'], ar: ['تصميم فائق السماكة', 'أقصى قوة', 'انكماش جيد', 'جودة صناعية'], es: ['Diseño ultra grueso', 'Máxima resistencia', 'Buena contracción', 'Calidad industrial'], pt: ['Design ultra-grosso', 'Máxima resistência', 'Boa contração', 'Qualidade industrial'] },
    applications: { zh: ['重型工业包装', '建筑材料包装', '特殊应用', '军事包装'], en: ['Heavy industrial packaging', 'Building materials packaging', 'Special applications', 'Military packaging'], ar: ['تغليف صناعي ثقيل', 'تغليف مواد البناء', 'تطبيقات خاصة', 'تغليف عسكري'], es: ['Empaquetado industrial pesado', 'Empaquetado de materiales de construcción', 'Aplicaciones especiales', 'Empaquetado militar'], pt: ['Embalagem industrial pesada', 'Embalagem de materiais de construção', 'Aplicações especiais', 'Embalagem militar'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/bops-30.jpg'], featured: false
  },
  {
    id: '45', slug: 'bops-35', name: { zh: 'BOPS薄膜 35微米', en: 'BOPS Film 35 Micron', ar: 'فيلم BOPS 35 ميكرون', es: 'Película BOPS 35 Micras', pt: 'Filme BOPS 35 Microns' }, category: 'bops',
    description: { zh: '超厚BOPS薄膜，提供最高的强度和最佳的收缩性能。适用于重型工业包装和特殊应用。', en: 'Ultra-thick BOPS film with maximum strength and optimal shrinkage properties. Suitable for heavy industrial packaging and special applications.', ar: 'فيلم BOPS فائق السماكة بأقصى قوة وانكماش مثالي.', es: 'Película BOPS ultra gruesa con máxima resistencia y contracción óptima.', pt: 'Filme BOPS ultra-grosso com máxima resistência e contração ideal.' },
    specifications: { thickness: '35 microns', width: '200-1600mm', length: '1000-2500m', weight: 'Customized', color: 'Transparent', material: 'Polystyrene' },
    features: { zh: ['超厚设计', '最高强度', '收缩性能好', '工业级品质'], en: ['Ultra-thick design', 'Maximum strength', 'Good shrinkage', 'Industrial grade quality'], ar: ['تصميم فائق السماكة', 'أقصى قوة', 'انكماش جيد', 'جودة صناعية'], es: ['Diseño ultra grueso', 'Máxima resistencia', 'Buena contracción', 'Calidad industrial'], pt: ['Design ultra-grosso', 'Máxima resistência', 'Boa contração', 'Qualidade industrial'] },
    applications: { zh: ['重型工业包装', '建筑材料包装', '特殊应用', '军事包装'], en: ['Heavy industrial packaging', 'Building materials packaging', 'Special applications', 'Military packaging'], ar: ['تغليف صناعي ثقيل', 'تغليف مواد البناء', 'تطبيقات خاصة', 'تغليف عسكري'], es: ['Empaquetado industrial pesado', 'Empaquetado de materiales de construcción', 'Aplicaciones especiales', 'Empaquetado militar'], pt: ['Embalagem industrial pesada', 'Embalagem de materiais de construção', 'Aplicações especiais', 'Embalagem militar'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/bops-35.jpg'], featured: false
  },

  // ==================== CPP 薄膜系列 ====================
  {
    id: '50', slug: 'cpp-20', name: { zh: 'CPP薄膜 20微米', en: 'CPP Film 20 Micron', ar: 'فيلم CPP 20 ميكرون', es: 'Película CPP 20 Micras', pt: 'Filme CPP 20 Microns' }, category: 'cpp',
    description: { zh: '标准CPP薄膜，具有良好的透明度和热封性能。适用于食品包装和日用品包装。', en: 'Standard CPP film with good transparency and heat seal properties. Suitable for food packaging and daily necessities packaging.', ar: 'فيلم CPP قياسي بشفافية جيدة وخصائص إغلاق حراري. مناسب لتغليف المواد الغذائية وتغليف الضروريات اليومية.', es: 'Película CPP estándar con buena transparencia y propiedades de termosellado.', pt: 'Filme CPP padrão com boa transparência e propriedades de selagem a quente.' },
    specifications: { thickness: '20 microns', width: '200-1600mm', length: '2000-4000m', weight: 'Customized', color: 'Transparent', material: 'Cast Polypropylene' },
    features: { zh: ['标准厚度', '良好透明度', '优异热封性能', '良好耐热性'], en: ['Standard thickness', 'Good transparency', 'Excellent heat seal properties', 'Good heat resistance'], ar: ['سماكة قياسية', 'شفافية جيدة', 'خصائص إغلاق حراري ممتازة', 'مقاومة حرارية جيدة'], es: ['Grosor estándar', 'Buena transparencia', 'Excelentes propiedades de termosellado', 'Buena resistencia al calor'], pt: ['Espessura padrão', 'Boa transparência', 'Excelentes propriedades de selagem a quente', 'Boa resistência ao calor'] },
    applications: { zh: ['食品包装', '日用品包装', '药品包装', '化妆品包装'], en: ['Food packaging', 'Daily necessities packaging', 'Pharmaceutical packaging', 'Cosmetic packaging'], ar: ['تغليف المواد الغذائية', 'تغليف الضروريات اليومية', 'تغليف المستحضرات الصيدلانية', 'تغليف مستحضرات التجميل'], es: ['Empaquetado de alimentos', 'Empaquetado de artículos de uso diario', 'Empaquetado farmacéutico', 'Empaquetado de cosméticos'], pt: ['Embalagem de alimentos', 'Embalagem de artigos de uso diário', 'Embalagem farmacêutica', 'Embalagem de cosméticos'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/cpp-20.jpg'], featured: true
  },
  {
    id: '51', slug: 'cpp-25', name: { zh: 'CPP薄膜 25微米', en: 'CPP Film 25 Micron', ar: 'فيلم CPP 25 ميكرون', es: 'Película CPP 25 Micras', pt: 'Filme CPP 25 Microns' }, category: 'cpp',
    description: { zh: '中厚CPP薄膜，提供更高的强度和热封性能。适用于要求较高的包装应用。', en: 'Medium-thick CPP film with higher strength and heat seal properties. Suitable for demanding packaging applications.', ar: 'فيلم CPP متوسط السماكة بقوة وخصائص إغلاق حراري أعلى.', es: 'Película CPP de grosor medio con mayor resistencia y propiedades de termosellado.', pt: 'Filme CPP de espessura média com maior resistência e propriedades de selagem a quente.' },
    specifications: { thickness: '25 microns', width: '200-1600mm', length: '1500-3500m', weight: 'Customized', color: 'Transparent', material: 'Cast Polypropylene' },
    features: { zh: ['中厚设计', '高強度', '优异热封性能', '良好耐热性'], en: ['Medium-thick design', 'High strength', 'Excellent heat seal properties', 'Good heat resistance'], ar: ['تصميم متوسط السماكة', 'قوة عالية', 'خصائص إغلاق حراري ممتازة', 'مقامة حرارية جيدة'], es: ['Diseño de grosor medio', 'Alta resistencia', 'Excelentes propiedades de termosellado', 'Buena resistencia al calor'], pt: ['Design de espessura média', 'Alta resistência', 'Excelentes propriedades de selagem a quente', 'Boa resistência ao calor'] },
    applications: { zh: ['食品包装', '日用品包装', '药品包装', '化妆品包装'], en: ['Food packaging', 'Daily necessities packaging', 'Pharmaceutical packaging', 'Cosmetic packaging'], ar: ['تغليف المواد الغذائية', 'تغليف الضروريات اليومية', 'تغليف المستحضرات الصيدلانية', 'تغليف مستحضرات التجميل'], es: ['Empaquetado de alimentos', 'Empaquetado de artículos de uso diario', 'Empaquetado farmacéutico', 'Empaquetado de cosméticos'], pt: ['Embalagem de alimentos', 'Embalagem de artigos de uso diário', 'Embalagem farmacêutica', 'Embalagem de cosméticos'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/cpp-25.jpg'], featured: false
  },
  {
    id: '52', slug: 'cpp-30', name: { zh: 'CPP薄膜 30微米', en: 'CPP Film 30 Micron', ar: 'فيلم CPP 30 ميكرون', es: 'Película CPP 30 Micras', pt: 'Filme CPP 30 Microns' }, category: 'cpp',
    description: { zh: '厚型CPP薄膜，提供最佳的热封性能和强度。适用于重型包装和高品质应用。', en: 'Thick CPP film with optimal heat seal properties and strength. Suitable for heavy-duty packaging and high-quality applications.', ar: 'فيلم CPP سميك بخصائص إغلاق حراري وقوة مثلى. مناسب للتغليف الثقيل والتطبيقات عالية الجودة.', es: 'Película CPP gruesa con propiedades de termosellado y resistencia óptimas.', pt: 'Filme CPP grosso com propriedades de selagem a quente e resistência ideais.' },
    specifications: { thickness: '30 microns', width: '200-1600mm', length: '1000-3000m', weight: 'Customized', color: 'Transparent', material: 'Cast Polypropylene' },
    features: { zh: ['厚型设计', '最佳热封性能', '高強度', '良好耐热性'], en: ['Thick design', 'Optimal heat seal properties', 'High strength', 'Good heat resistance'], ar: ['تصميم سميك', 'خصائص إغلاق حراري مثالية', 'قوة عالية', 'مقاومة حرارية جيدة'], es: ['Diseño grueso', 'Propiedades de termosellado óptimas', 'Alta resistencia', 'Buena resistencia al calor'], pt: ['Design grosso', 'Propriedades de selagem a quente ideais', 'Alta resistência', 'Boa resistência ao calor'] },
    applications: { zh: ['重型包装', '高品质印刷', '工业包装', '建筑材料包装'], en: ['Heavy-duty packaging', 'High-quality printing', 'Industrial packaging', 'Building materials packaging'], ar: ['تغليف ثقيل', 'طباعة عالية الجودة', 'تغليف صناعي', 'تغليف مواد البناء'], es: ['Empaquetado de alta resistencia', 'Impresión de alta calidad', 'Empaquetado industrial', 'Empaquetado de materiales de construcción'], pt: ['Embalagem pesada', 'Impressão de alta qualidade', 'Embalagem industrial', 'Embalagem de materiais de construção'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/cpp-30.jpg'], featured: false
  },
  {
    id: '53', slug: 'cpp-35', name: { zh: 'CPP薄膜 35微米', en: 'CPP Film 35 Micron', ar: 'فيلم CPP 35 ميكرون', es: 'Película CPP 35 Micras', pt: 'Filme CPP 35 Microns' }, category: 'cpp',
    description: { zh: '厚型CPP薄膜，提供最佳的热封性能和强度。适用于重型包装和高品质应用。', en: 'Thick CPP film with optimal heat seal properties and strength. Suitable for heavy-duty packaging and high-quality applications.', ar: 'فيلم CPP سميك بخصائص إغلاق حراري وقوة مثلى.', es: 'Película CPP gruesa con propiedades de termosellado y resistencia óptimas.', pt: 'Filme CPP grosso com propriedades de selagem a quente e resistência ideais.' },
    specifications: { thickness: '35 microns', width: '200-1600mm', length: '1000-3000m', weight: 'Customized', color: 'Transparent', material: 'Cast Polypropylene' },
    features: { zh: ['厚型设计', '最佳热封性能', '高強度', '良好耐热性'], en: ['Thick design', 'Optimal heat seal properties', 'High strength', 'Good heat resistance'], ar: ['تصميم سميك', 'خصائص إغلاق حراري مثالية', 'قوة عالية', 'مقاومة حرارية جيدة'], es: ['Diseño grueso', 'Propiedades de termosellado óptimas', 'Alta resistencia', 'Buena resistencia al calor'], pt: ['Design grosso', 'Propriedades de selagem a quente ideais', 'Alta resistência', 'Boa resistência ao calor'] },
    applications: { zh: ['重型包装', '高品质印刷', '工业包装', '建筑材料包装'], en: ['Heavy-duty packaging', 'High-quality printing', 'Industrial packaging', 'Building materials packaging'], ar: ['تغليف ثقيل', 'طباعة عالية الجودة', 'تغليف صناعي', 'تغليف مواد البناء'], es: ['Empaquetado de alta resistencia', 'Impresión de alta calidad', 'Empaquetado industrial', 'Empaquetado de materiales de construcción'], pt: ['Embalagem pesada', 'Impressão de alta qualidade', 'Embalagem industrial', 'Embalagem de materiais de construção'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/cpp-35.jpg'], featured: false
  },
  {
    id: '54', slug: 'cpp-40', name: { zh: 'CPP薄膜 40微米', en: 'CPP Film 40 Micron', ar: 'فيلم CPP 40 ميكرون', es: 'Película CPP 40 Micras', pt: 'Filme CPP 40 Microns' }, category: 'cpp',
    description: { zh: '超厚CPP薄膜，提供最高的强度和最佳的热封性能。适用于重型工业包装和特殊应用。', en: 'Ultra-thick CPP film with maximum strength and optimal heat seal properties. Suitable for heavy industrial packaging and special applications.', ar: 'فيلم CPP فائق السماكة بأقصى قوة وخصائص إغلاق حراري مثالية.', es: 'Película CPP ultra gruesa con máxima resistencia y propiedades de termosellado óptimas.', pt: 'Filme CPP ultra-grosso com máxima resistência e propriedades de selagem a quente ideais.' },
    specifications: { thickness: '40 microns', width: '200-1600mm', length: '1000-2500m', weight: 'Customized', color: 'Transparent', material: 'Cast Polypropylene' },
    features: { zh: ['超厚设计', '最高强度', '最佳热封性能', '工业级品质'], en: ['Ultra-thick design', 'Maximum strength', 'Optimal heat seal properties', 'Industrial grade quality'], ar: ['تصميم فائق السماكة', 'أقصى قوة', 'خصائص إغلاق حراري مثالية', 'جودة صناعية'], es: ['Diseño ultra grueso', 'Máxima resistencia', 'Propiedades de termosellado óptimas', 'Calidad industrial'], pt: ['Design ultra-grosso', 'Máxima resistência', 'Propriedades de selagem a quente ideais', 'Qualidade industrial'] },
    applications: { zh: ['重型工业包装', '建筑材料包装', '特殊应用', '军事包装'], en: ['Heavy industrial packaging', 'Building materials packaging', 'Special applications', 'Military packaging'], ar: ['تغليف صناعي ثقيل', 'تغليف مواد البناء', 'تطبيقات خاصة', 'تغليف عسكري'], es: ['Empaquetado industrial pesado', 'Empaquetado de materiales de construcción', 'Aplicaciones especiales', 'Empaquetado militar'], pt: ['Embalagem industrial pesada', 'Embalagem de materiais de construção', 'Aplicações especiais', 'Embalagem militar'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/cpp-40.jpg'], featured: false
  },
  {
    id: '55', slug: 'cpp-50', name: { zh: 'CPP薄膜 50微米', en: 'CPP Film 50 Micron', ar: 'فيلم CPP 50 ميكرون', es: 'Película CPP 50 Micras', pt: 'Filme CPP 50 Microns' }, category: 'cpp',
    description: { zh: '超厚CPP薄膜，提供最高的强度和最佳的热封性能。适用于重型工业包装和特殊应用。', en: 'Ultra-thick CPP film with maximum strength and optimal heat seal properties. Suitable for heavy industrial packaging and special applications.', ar: 'فيلم CPP فائق السماكة بأقصى قوة وخصائص إغلاق حراري مثالية.', es: 'Película CPP ultra gruesa con máxima resistencia y propiedades de termosellado óptimas.', pt: 'Filme CPP ultra-grosso com máxima resistência e propriedades de selagem a quente ideais.' },
    specifications: { thickness: '50 microns', width: '200-1600mm', length: '500-1500m', weight: 'Customized', color: 'Transparent', material: 'Cast Polypropylene' },
    features: { zh: ['超厚设计', '最高强度', '最佳热封性能', '工业级品质'], en: ['Ultra-thick design', 'Maximum strength', 'Optimal heat seal properties', 'Industrial grade quality'], ar: ['تصميم فائق السماكة', 'أقصى قوة', 'خصائص إغلاق حراري مثالية', 'جودة صناعية'], es: ['Diseño ultra grueso', 'Máxima resistencia', 'Propiedades de termosellado óptimas', 'Calidad industrial'], pt: ['Design ultra-grosso', 'Máxima resistência', 'Propriedades de selagem a quente ideais', 'Qualidade industrial'] },
    applications: { zh: ['重型工业包装', '建筑材料包装', '特殊应用', '军事包装'], en: ['Heavy industrial packaging', 'Building materials packaging', 'Special applications', 'Military packaging'], ar: ['تغليف صناعي ثقيل', 'تغليف مواد البناء', 'تطبيقات خاصة', 'تغليف عسكري'], es: ['Empaquetado industrial pesado', 'Empaquetado de materiales de construcción', 'Aplicaciones especiales', 'Empaquetado militar'], pt: ['Embalagem industrial pesada', 'Embalagem de materiais de construção', 'Aplicações especiais', 'Embalagem militar'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/cpp-50.jpg'], featured: false
  },

  // ==================== 胶带产品系列 ====================
  {
    id: '60', slug: 'bopp-tape-prod', name: { zh: 'BOPP胶带', en: 'BOPP Tape', ar: 'شريط BOPP', es: 'Cinta BOPP', pt: 'Fita BOPP' }, category: 'tape',
    description: { zh: '标准BOPP胶带，具有优异的拉伸强度和粘性。适用于各种包装和固定应用。', en: 'Standard BOPP tape with excellent tensile strength and adhesion. Suitable for various packaging and fixing applications.', ar: 'شريط BOPP قياسي بقوة شد ممتازة والتصاق.', es: 'Cinta BOPP estándar con excelente resistencia a la tracción y adhesión.', pt: 'Fita BOPP padrão com excelente resistência à tração e adesão.' },
    specifications: { thickness: '18-25 microns', width: '12-48mm', length: '50-1000m', weight: 'Customized', color: 'Transparent/Brown', material: 'Polypropylene + Adhesive' },
    features: { zh: ['优异拉伸强度', '良好粘性', '耐热性好', '适合高速涂布'], en: ['Excellent tensile strength', 'Good adhesion', 'Good heat resistance', 'Suitable for high-speed coating'], ar: ['قوة شد ممتازة', 'التصاق جيد', 'مقاومة حرارية جيدة', 'مناسب للطلاء عالي السرعة'], es: ['Excelente resistencia a la tracción', 'Buena adhesión', 'Buena resistencia al calor', 'Adecuado para recubrimiento de alta velocidad'], pt: ['Excelente resistência à tração', 'Boa adesão', 'Boa resistência ao calor', 'Adequado para revestimento de alta velocidade'] },
    applications: { zh: ['包装胶带', '文具胶带', '工业胶带', '双面胶带'], en: ['Packaging tape', 'Stationery tape', 'Industrial tape', 'Double-sided tape'], ar: ['شريط التغليف', 'شريط القرطاسية', 'الشريط الصناعي', 'شريط مزدوج الوجه'], es: ['Cinta de empaquetado', 'Cinta de papelería', 'Cinta industrial', 'Cinta de doble cara'], pt: ['Fita de embalagem', 'Fita de papelaria', 'Fita industrial', 'Fita dupla face'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/bopp-tape.jpg'], featured: true
  },
  {
    id: '61', slug: 'pet-tape', name: { zh: 'PET胶带', en: 'PET Tape', ar: 'شريط PET', es: 'Cinta PET', pt: 'Fita PET' }, category: 'tape',
    description: { zh: 'PET胶带，具有优异的透明度、强度和耐热性。适用于高端包装和电子应用。', en: 'PET tape with excellent transparency, strength and heat resistance. Suitable for high-end packaging and electronics applications.', ar: 'شريط PET بشفافية وقوة ومقاومة حرارية ممتازة.', es: 'Cinta PET con excelente transparencia, resistencia y resistencia al calor.', pt: 'Fita PET com excelente transparência, resistência e resistência ao calor.' },
    specifications: { thickness: '12-20 microns', width: '12-48mm', length: '50-1000m', weight: 'Customized', color: 'Transparent', material: 'Polyethylene Terephthalate + Adhesive' },
    features: { zh: ['优异透明度', '高強度', '耐热性好', '优异印刷适性'], en: ['Excellent transparency', 'High strength', 'Good heat resistance', 'Excellent printability'], ar: ['شفافية ممتازة', 'قوة عالية', 'مقاومة حرارية جيدة', 'قابلية طباعة ممتازة'], es: ['Excelente transparencia', 'Alta resistencia', 'Buena resistencia al calor', 'Imprimibilidad excelente'], pt: ['Excelente transparência', 'Alta resistência', 'Boa resistência ao calor', 'Imprimibilidade excelente'] },
    applications: { zh: ['高端包装', '电子产品', '光学应用', '太阳能电池'], en: ['High-end packaging', 'Electronics', 'Optical applications', 'Solar cells'], ar: ['تغليف عالي الجودة', 'إلكترونيات', 'تطبيقات بصرية', 'خلايا شمسية'], es: ['Empaquetado de alta gama', 'Electrónicos', 'Aplicaciones ópticas', 'Células solares'], pt: ['Embalagem de alta qualidade', 'Eletrônicos', 'Aplicações ópticas', 'Células solares'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/pet-tape.jpg'], featured: false
  },
  {
    id: '62', slug: 'cpp-tape', name: { zh: 'CPP胶带', en: 'CPP Tape', ar: 'شريط CPP', es: 'Cinta CPP', pt: 'Fita CPP' }, category: 'tape',
    description: { zh: 'CPP胶带，具有良好的热封性能和粘性。适用于食品包装和日用品包装。', en: 'CPP tape with good heat seal properties and adhesion. Suitable for food packaging and daily necessities packaging.', ar: 'شريط CPP بخصائص إغلاق حراري جيدة والتصاق.', es: 'Cinta CPP con buenas propiedades de termosellado y adhesión.', pt: 'Fita CPP com boas propriedades de selagem a quente e adesão.' },
    specifications: { thickness: '20-30 microns', width: '12-48mm', length: '50-1000m', weight: 'Customized', color: 'Transparent', material: 'Cast Polypropylene + Adhesive' },
    features: { zh: ['良好热封性能', '良好粘性', '耐热性好', '适合高速涂布'], en: ['Good heat seal properties', 'Good adhesion', 'Good heat resistance', 'Suitable for high-speed coating'], ar: ['خصائص إغلاق حراري جيدة', 'التصاق جيد', 'مقاومة حرارية جيدة', 'مناسب للطلاء عالي السرعة'], es: ['Buenas propiedades de termosellado', 'Buena adhesión', 'Buena resistencia al calor', 'Adecuado para recubrimiento de alta velocidad'], pt: ['Boas propriedades de selagem a quente', 'Boa adesão', 'Boa resistência ao calor', 'Adequado para revestimento de alta velocidade'] },
    applications: { zh: ['食品包装', '日用品包装', '药品包装', '化妆品包装'], en: ['Food packaging', 'Daily necessities packaging', 'Pharmaceutical packaging', 'Cosmetic packaging'], ar: ['تغليف المواد الغذائية', 'تغليف الضروريات اليومية', 'تغليف المستحضرات الصيدلانية', 'تغليف مستحضرات التجميل'], es: ['Empaquetado de alimentos', 'Empaquetado de artículos de uso diario', 'Empaquetado farmacéutico', 'Empaquetado de cosméticos'], pt: ['Embalagem de alimentos', 'Embalagem de artigos de uso diário', 'Embalagem farmacêutica', 'Embalagem de cosméticos'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/cpp-tape.jpg'], featured: false
  },
  {
    id: '63', slug: 'double-sided', name: { zh: '双面胶带', en: 'Double-sided Tape', ar: 'شريط مزدوج', es: 'Cinta de doble cara', pt: 'Fita dupla face' }, category: 'tape',
    description: { zh: '双面胶带，两面都有粘性。适用于各种固定和粘合应用。', en: 'Double-sided tape with adhesive on both sides. Suitable for various fixing and bonding applications.', ar: 'شريط مزدوج بالتصاق على كلا الجانبين.', es: 'Cinta de doble cara con adhesivo en ambos lados.', pt: 'Fita dupla face com adesivo em ambos os lados.' },
    specifications: { thickness: '15-25 microns', width: '12-48mm', length: '10-100m', weight: 'Customized', color: 'Transparent/White', material: 'Acrylic Adhesive + Carrier' },
    features: { zh: ['双面粘性', '优异拉伸强度', '良好耐热性', '适合多种表面'], en: ['Double-sided adhesion', 'Excellent tensile strength', 'Good heat resistance', 'Suitable for various surfaces'], ar: ['تصاق مزدوج', 'قوة شد ممتازة', 'مقاومة حرارية جيدة', 'مناسب لأسطح متعددة'], es: ['Adhesión de doble cara', 'Excelente resistencia a la tracción', 'Buena resistencia al calor', 'Adecuado para varias superficies'], pt: ['Adesão dupla face', 'Excelente resistência à tração', 'Boa resistência ao calor', 'Adequado para várias superfícies'] },
    applications: { zh: ['固定应用', '粘合应用', '装饰应用', '工业应用'], en: ['Fixing applications', 'Bonding applications', 'Decorative applications', 'Industrial applications'], ar: ['تطبيقات تثبيت', 'تطبيقات لصق', 'تطبيقات زخرفية', 'تطبيقات صناعية'], es: ['Aplicaciones de fijación', 'Aplicaciones de pegado', 'Aplicaciones decorativas', 'Aplicaciones industriales'], pt: ['Aplicações de fixação', 'Aplicações de colagem', 'Aplicações decorativas', 'Aplicações industriais'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/double-sided-tape.jpg'], featured: false
  },
  {
    id: '64', slug: 'masking-tape', name: { zh: '遮蔽胶带', en: 'Masking Tape', ar: 'شريط إخفاء', es: 'Cinta de enmascarar', pt: 'Fita de máscara' }, category: 'tape',
    description: { zh: '遮蔽胶带，用于油漆遮蔽和保护。具有良好的粘性和耐热性。', en: 'Masking tape for paint masking and protection. Good adhesion and heat resistance.', ar: 'شريط إخفاء لإخفاء الطلاء والحماية.', es: 'Cinta de enmascarar para enmascarar y proteger la pintura.', pt: 'Fita de máscara para mascarar e proteger a pintura.' },
    specifications: { thickness: '15-20 microns', width: '12-48mm', length: '10-50m', weight: 'Customized', color: 'Beige/White', material: 'Crepe Paper + Rubber Adhesive' },
    features: { zh: ['良好粘性', '耐热性好', '易撕裂', '不留残胶'], en: ['Good adhesion', 'Good heat resistance', 'Easy to tear', 'No residue'], ar: ['التصاق جيد', 'مقاومة حرارية جيدة', 'سهل التمزق', 'لا يترك بقايا'], es: ['Buena adhesión', 'Buena resistencia al calor', 'Fácil de rasgar', 'Sin residuos'], pt: ['Boa adesão', 'Boa resistência ao calor', 'Fácil de rasgar', 'Sem resíduos'] },
    applications: { zh: ['油漆遮蔽', '保护应用', '装饰应用', '工业应用'], en: ['Paint masking', 'Protection applications', 'Decorative applications', 'Industrial applications'], ar: ['إخفاء الطلاء', 'تطبيقات حماية', 'تطبيقات زخرفية', 'تطبيقات صناعية'], es: ['Enmascarar pintura', 'Aplicaciones de protección', 'Aplicaciones decorativas', 'Aplicaciones industriales'], pt: ['Mascarar pintura', 'Aplicações de proteção', 'Aplicações decorativas', 'Aplicações industriais'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/masking-tape.jpg'], featured: false
  },
  {
    id: '65', slug: 'packing-tape', name: { zh: '包装胶带', en: 'Packing Tape', ar: 'شريط تغليف', es: 'Cinta de empaquetado', pt: 'Fita de embalagem' }, category: 'tape',
    description: { zh: '包装胶带，用于纸箱封口和包装固定。具有优异的拉伸强度和粘性。', en: 'Packing tape for carton sealing and packaging fixing. Excellent tensile strength and adhesion.', ar: 'شريط تغليف لختم الكرتون وتثبيت التغليف.', es: 'Cinta de empaquetado para sellado de cartones y fijación de empaques.', pt: 'Fita de embalagem para vedação de caixas e fixação de embalagens.' },
    specifications: { thickness: '20-30 microns', width: '12-48mm', length: '50-1000m', weight: 'Customized', color: 'Transparent/Brown', material: 'Polypropylene + Acrylic Adhesive' },
    features: { zh: ['优异拉伸强度', '良好粘性', '耐热性好', '适合高速涂布'], en: ['Excellent tensile strength', 'Good adhesion', 'Good heat resistance', 'Suitable for high-speed coating'], ar: ['قوة شد ممتازة', 'التصاق جيد', 'مقاومة حرارية جيدة', 'مناسب للطلاء عالي السرعة'], es: ['Excelente resistencia a la tracción', 'Buena adhesión', 'Buena resistencia al calor', 'Adecuado para recubrimiento de alta velocidade'], pt: ['Excelente resistência à tração', 'Boa adesão', 'Boa resistência ao calor', 'Adequado para revestimento de alta velocidade'] },
    applications: { zh: ['纸箱封口', '包装固定', '物流运输', '仓储应用'], en: ['Carton sealing', 'Packaging fixing', 'Logistics transportation', 'Warehousing applications'], ar: ['ختم الكرتون', 'تثبيت التغليف', 'نقل لوجستي', 'تطبيقات تخزين'], es: ['Sellado de cartones', 'Fijación de empaques', 'Transporte logístico', 'Aplicaciones de almacenamiento'], pt: ['Vedação de caixas', 'Fixação de embalagens', 'Transporte logístico', 'Aplicações de armazenamento'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/packing-tape.jpg'], featured: false
  },

  // ==================== 特种薄膜系列 ====================
  {
    id: '70', slug: 'anti-static', name: { zh: '抗静电膜', en: 'Anti-static Film', ar: 'فيلم مضاد للكهرباء', es: 'Película antiestática', pt: 'Filme antiestático' }, category: 'specialty',
    description: { zh: '抗静电膜，具有优异的抗静电性能。适用于电子产品包装和防静电应用。', en: 'Anti-static film with excellent anti-static properties. Suitable for electronics packaging and anti-static applications.', ar: 'فيلم مضاد للكهرباء بخصائص مضادة للكهرباء الساكنة ممتازة.', es: 'Película antiestática con excelentes propiedades antiestáticas.', pt: 'Filme antiestático com excelentes propriedades antiestáticas.' },
    specifications: { thickness: '18-50 microns', width: '200-1600mm', length: '1000-5000m', weight: 'Customized', color: 'Transparent/Pink', material: 'Polypropylene + Anti-static Agent' },
    features: { zh: ['优异抗静电性能', '良好透明度', '优异强度', '耐热性好'], en: ['Excellent anti-static properties', 'Good transparency', 'Excellent strength', 'Good heat resistance'], ar: ['خصائص مضادة للكهرباء الساكنة ممتازة', 'شفافية جيدة', 'قوة ممتازة', 'مقاومة حرارية جيدة'], es: ['Excelentes propiedades antiestáticas', 'Buena transparencia', 'Excelente resistencia', 'Buena resistencia al calor'], pt: ['Excelentes propriedades antiestáticas', 'Boa transparência', 'Excelente resistência', 'Boa resistência ao calor'] },
    applications: { zh: ['电子产品包装', '防静电应用', '半导体包装', '精密仪器包装'], en: ['Electronics packaging', 'Anti-static applications', 'Semiconductor packaging', 'Precision instrument packaging'], ar: ['تغليف الإلكترونيات', 'تطبيقات مضادة للكهرباء', 'تغليف أشباه الموصلات', 'تغليف الأدوات الدقيقة'], es: ['Empaquetado de electrónicos', 'Aplicaciones antiestáticas', 'Empaquetado de semiconductores', 'Empaquetado de instrumentos de precisión'], pt: ['Embalagem de eletrônicos', 'Aplicações antiestáticas', 'Embalagem de semicondutores', 'Embalagem de instrumentos de precisão'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/anti-static.jpg'], featured: true
  },
  {
    id: '71', slug: 'flame-retardant', name: { zh: '阻燃膜', en: 'Flame Retardant Film', ar: 'فيلم مقاوم للحريق', es: 'Película ignífuga', pt: 'Filme retardante de chama' }, category: 'specialty',
    description: { zh: '阻燃膜，具有优异的阻燃性能。适用于防火包装和建筑材料。', en: 'Flame retardant film with excellent flame retardant properties. Suitable for fireproof packaging and building materials.', ar: 'فيلم مقاوم للحريق بخصائص مقاومة للحريق ممتازة.', es: 'Película ignífuga con excelentes propiedades ignífugas.', pt: 'Filme retardante de chama com excelentes propriedades retardantes de chama.' },
    specifications: { thickness: '20-50 microns', width: '200-1600mm', length: '1000-5000m', weight: 'Customized', color: 'White/Gray', material: 'Polypropylene + Flame Retardant' },
    features: { zh: ['优异阻燃性能', '良好强度', '耐热性好', '环保无毒'], en: ['Excellent flame retardant properties', 'Good strength', 'Good heat resistance', 'Eco-friendly'], ar: ['خصائص مقاومة للحريق ممتازة', 'قوة جيدة', 'مقاومة حرارية جيدة', 'صديق للبيئة'], es: ['Excelentes propiedades ignífugas', 'Buena resistencia', 'Buena resistencia al calor', 'Ecológico'], pt: ['Excelentes propriedades retardantes de chama', 'Boa resistência', 'Boa resistência ao calor', 'Ecológico'] },
    applications: { zh: ['防火包装', '建筑材料', '电子包装', '航空航天'], en: ['Fireproof packaging', 'Building materials', 'Electronics packaging', 'Aerospace'], ar: ['تغليف مقاوم للحريق', 'مواد البناء', 'تغليف الإلكترونيات', 'الطيران والفضاء'], es: ['Empaquetado ignífugo', 'Materiales de construcción', 'Empaquetado de electrónicos', 'Aeroespacial'], pt: ['Embalagem à prova de fogo', 'Materiais de construção', 'Embalagem de eletrônicos', 'Aeroespacial'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS', 'UL94'], images: ['/images/products/flame-retardant.jpg'], featured: false
  },
  {
    id: '72', slug: 'high-temp', name: { zh: '耐高温膜', en: 'High Temperature Film', ar: 'فيلم مقاوم للحرارة', es: 'Película resistente al calor', pt: 'Filme resistente ao calor' }, category: 'specialty',
    description: { zh: '耐高温膜，具有优异的耐高温性能。适用于高温环境包装和特殊应用。', en: 'High temperature film with excellent high temperature resistance. Suitable for high temperature environment packaging and special applications.', ar: 'فيلم مقاوم للحرارة بمقاومة حرارية ممتازة.', es: 'Película resistente al calor con excelente resistencia a alta temperatura.', pt: 'Filme resistente ao calor com excelente resistência a altas temperaturas.' },
    specifications: { thickness: '20-50 microns', width: '200-1600mm', length: '1000-5000m', weight: 'Customized', color: 'Transparent/Amber', material: 'Polypropylene + Heat Stabilizer' },
    features: { zh: ['优异耐高温性能', '良好强度', '耐热性好', '化学稳定性好'], en: ['Excellent high temperature resistance', 'Good strength', 'Good heat resistance', 'Good chemical stability'], ar: ['مقاومة حرارية ممتازة', 'قوة جيدة', 'مقاومة حرارية جيدة', 'استقرار كيميائي جيد'], es: ['Excelente resistencia a alta temperatura', 'Buena resistencia', 'Buena resistencia al calor', 'Buena estabilidad química'], pt: ['Excelente resistência a altas temperaturas', 'Boa resistência', 'Boa resistência ao calor', 'Boa estabilidade química'] },
    applications: { zh: ['高温环境包装', '食品包装', '化工包装', '特殊应用'], en: ['High temperature environment packaging', 'Food packaging', 'Chemical packaging', 'Special applications'], ar: ['تغليف بيئة درجة الحرارة العالية', 'تغليف المواد الغذائية', 'تغليف المواد الكيميائية', 'تطبيقات خاصة'], es: ['Empaquetado de ambiente de alta temperatura', 'Empaquetado de alimentos', 'Empaquetado de productos químicos', 'Aplicaciones especiales'], pt: ['Embalagem de ambiente de alta temperatura', 'Embalagem de alimentos', 'Embalagem de produtos químicos', 'Aplicações especiais'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/high-temp.jpg'], featured: false
  },
  {
    id: '73', slug: 'barrier-film', name: { zh: '高阻隔膜', en: 'High Barrier Film', ar: 'فيلم حاجز عالي', es: 'Película de barrera alta', pt: 'Filme de barreira alta' }, category: 'specialty',
    description: { zh: '高阻隔膜，具有优异的阻隔性能。适用于食品保鲜和药品包装。', en: 'High barrier film with excellent barrier properties. Suitable for food preservation and pharmaceutical packaging.', ar: 'فيلم حاجز عالي بخصائص حاجزة ممتازة.', es: 'Película de barrera alta con excelentes propiedades de barrera.', pt: 'Filme de barreira alta com excelentes propriedades de barreira.' },
    specifications: { thickness: '18-50 microns', width: '200-1600mm', length: '1000-5000m', weight: 'Customized', color: 'Transparent', material: 'Polypropylene + EVOH' },
    features: { zh: ['优异阻隔性能', '良好透明度', '优异强度', '保鲜性能好'], en: ['Excellent barrier properties', 'Good transparency', 'Excellent strength', 'Good preservation properties'], ar: ['خصائص حاجزة ممتازة', 'شفافية جيدة', 'قوة ممتازة', 'خصائص حفظ جيدة'], es: ['Excelentes propiedades de barrera', 'Buena transparencia', 'Excelente resistencia', 'Buenas propiedades de conservación'], pt: ['Excelentes propriedades de barreira', 'Boa transparência', 'Excelente resistência', 'Boas propriedades de conservação'] },
    applications: { zh: ['食品保鲜', '药品包装', '化妆品包装', '特殊应用'], en: ['Food preservation', 'Pharmaceutical packaging', 'Cosmetic packaging', 'Special applications'], ar: ['حفظ المواد الغذائية', 'تغليف المستحضرات الصيدلانية', 'تغليف مستحضرات التجميل', 'تطبيقات خاصة'], es: ['Conservación de alimentos', 'Empaquetado farmacéutico', 'Empaquetado de cosméticos', 'Aplicaciones especiales'], pt: ['Conservação de alimentos', 'Embalagem farmacêutica', 'Embalagem de cosméticos', 'Aplicações especiais'] },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'], images: ['/images/products/barrier-film.jpg'], featured: false
  },
];

export const categories = [
  { id: 'all', name: { zh: '全部产品', en: 'All Products', ar: 'جميع المنتجات', es: 'Todos los Productos', pt: 'Todos os Produtos' } },
  { id: 'bopp-gloss', name: { zh: 'BOPP光膜', en: 'BOPP Gloss Film', ar: 'فيلم BOPP لامع', es: 'Película BOPP Brillante', pt: 'Filme BOPP Brilhante' }, subcategories: [
    { id: 'bopp-gloss-15', name: { zh: '15微米', en: '15 Micron', ar: '15 ميكرون', es: '15 Micras', pt: '15 Microns' } },
    { id: 'bopp-gloss-18', name: { zh: '18微米', en: '18 Micron', ar: '18 ميكرون', es: '18 Micras', pt: '18 Microns' } },
    { id: 'bopp-gloss-20', name: { zh: '20微米', en: '20 Micron', ar: '20 ميكرون', es: '20 Micras', pt: '20 Microns' } },
    { id: 'bopp-gloss-25', name: { zh: '25微米', en: '25 Micron', ar: '25 ميكرون', es: '25 Micras', pt: '25 Microns' } },
    { id: 'bopp-gloss-30', name: { zh: '30微米', en: '30 Micron', ar: '30 ميكرون', es: '30 Micras', pt: '30 Microns' } },
  ]},
  { id: 'bopp-matte', name: { zh: 'BOPP哑膜', en: 'BOPP Matte Film', ar: 'فيلم BOPP غير لامع', es: 'Película BOPP Mate', pt: 'Filme BOPP Fosco' }, subcategories: [
    { id: 'bopp-matte-18', name: { zh: '18微米', en: '18 Micron', ar: '18 ميكرون', es: '18 Micras', pt: '18 Microns' } },
    { id: 'bopp-matte-20', name: { zh: '20微米', en: '20 Micron', ar: '20 ميكرون', es: '20 Micras', pt: '20 Microns' } },
    { id: 'bopp-matte-25', name: { zh: '25微米', en: '25 Micron', ar: '25 ميكرون', es: '25 Micras', pt: '25 Microns' } },
    { id: 'bopp-matte-30', name: { zh: '30微米', en: '30 Micron', ar: '30 ميكرون', es: '30 Micras', pt: '30 Microns' } },
  ]},
  { id: 'bopp-metalized', name: { zh: 'BOPP镀铝膜', en: 'BOPP Metalized Film', ar: 'فيلم BOPP معدني', es: 'Película BOPP Metalizada', pt: 'Filme BOPP Metalizado' }, subcategories: [
    { id: 'bopp-metalized-18', name: { zh: '18微米', en: '18 Micron', ar: '18 ميكرون', es: '18 Micras', pt: '18 Microns' } },
    { id: 'bopp-metalized-20', name: { zh: '20微米', en: '20 Micron', ar: '20 ميكرون', es: '20 Micras', pt: '20 Microns' } },
    { id: 'bopp-metalized-25', name: { zh: '25微米', en: '25 Micron', ar: '25 ميكرون', es: '25 Micras', pt: '25 Microns' } },
    { id: 'bopp-metalized-30', name: { zh: '30微米', en: '30 Micron', ar: '30 ميكرون', es: '30 Micras', pt: '30 Microns' } },
  ]},
  { id: 'bopp-heatseal', name: { zh: 'BOPP热封膜', en: 'BOPP Heat Sealable Film', ar: 'فيلم BOPP قابل للحرار', es: 'Película BOPP Termosellable', pt: 'Filme BOPP Termosselável' }, subcategories: [
    { id: 'bopp-heatseal-20', name: { zh: '20微米', en: '20 Micron', ar: '20 ميكرون', es: '20 Micras', pt: '20 Microns' } },
    { id: 'bopp-heatseal-25', name: { zh: '25微米', en: '25 Micron', ar: '25 ميكرون', es: '25 Micras', pt: '25 Microns' } },
    { id: 'bopp-heatseal-30', name: { zh: '30微米', en: '30 Micron', ar: '30 ميكرون', es: '30 Micras', pt: '30 Microns' } },
    { id: 'bopp-heatseal-35', name: { zh: '35微米', en: '35 Micron', ar: '35 ميكرون', es: '35 Micras', pt: '35 Microns' } },
  ]},
  { id: 'bopp-white', name: { zh: 'BOPP白膜', en: 'BOPP White Opaque Film', ar: 'فيلم BOPP أبيض معتم', es: 'Película BOPP Blanca Opaca', pt: 'Filme BOPP Branco Opaco' }, subcategories: [
    { id: 'bopp-white-20', name: { zh: '20微米', en: '20 Micron', ar: '20 ميكرون', es: '20 Micras', pt: '20 Microns' } },
    { id: 'bopp-white-25', name: { zh: '25微米', en: '25 Micron', ar: '25 ميكرون', es: '25 Micras', pt: '25 Microns' } },
    { id: 'bopp-white-30', name: { zh: '30微米', en: '30 Micron', ar: '30 ميكرون', es: '30 Micras', pt: '30 Microns' } },
    { id: 'bopp-white-35', name: { zh: '35微米', en: '35 Micron', ar: '35 ميكرون', es: '35 Micras', pt: '35 Microns' } },
  ]},
  { id: 'bopp-tape', name: { zh: 'BOPP胶带膜', en: 'BOPP Tape Film', ar: 'فيلم BOPP شريط', es: 'Película BOPP de Cinta', pt: 'Filme BOPP de Fita' }, subcategories: [
    { id: 'bopp-tape-15', name: { zh: '15微米', en: '15 Micron', ar: '15 ميكرون', es: '15 Micras', pt: '15 Microns' } },
    { id: 'bopp-tape-18', name: { zh: '18微米', en: '18 Micron', ar: '18 ميكرون', es: '18 Micras', pt: '18 Microns' } },
    { id: 'bopp-tape-20', name: { zh: '20微米', en: '20 Micron', ar: '20 ميكرون', es: '20 Micras', pt: '20 Microns' } },
    { id: 'bopp-tape-25', name: { zh: '25微米', en: '25 Micron', ar: '25 ميكرون', es: '25 Micras', pt: '25 Microns' } },
  ]},
  { id: 'bopet', name: { zh: 'BOPET薄膜', en: 'BOPET Film', ar: 'فيلم BOPET', es: 'Película BOPET', pt: 'Filme BOPET' }, subcategories: [
    { id: 'bopet-12', name: { zh: '12微米', en: '12 Micron', ar: '12 ميكرون', es: '12 Micras', pt: '12 Microns' } },
    { id: 'bopet-15', name: { zh: '15微米', en: '15 Micron', ar: '15 ميكرون', es: '15 Micras', pt: '15 Microns' } },
    { id: 'bopet-18', name: { zh: '18微米', en: '18 Micron', ar: '18 ميكرون', es: '18 Micras', pt: '18 Microns' } },
    { id: 'bopet-20', name: { zh: '20微米', en: '20 Micron', ar: '20 ميكرون', es: '20 Micras', pt: '20 Microns' } },
    { id: 'bopet-25', name: { zh: '25微米', en: '25 Micron', ar: '25 ميكرون', es: '25 Micras', pt: '25 Microns' } },
    { id: 'bopet-30', name: { zh: '30微米', en: '30 Micron', ar: '30 ميكرون', es: '30 Micras', pt: '30 Microns' } },
    { id: 'bopet-35', name: { zh: '35微米', en: '35 Micron', ar: '35 ميكرون', es: '35 Micras', pt: '35 Microns' } },
    { id: 'bopet-50', name: { zh: '50微米', en: '50 Micron', ar: '50 ميكرون', es: '50 Micras', pt: '50 Microns' } },
  ]},
  { id: 'bops', name: { zh: 'BOPS薄膜', en: 'BOPS Film', ar: 'فيلم BOPS', es: 'Película BOPS', pt: 'Filme BOPS' }, subcategories: [
    { id: 'bops-15', name: { zh: '15微米', en: '15 Micron', ar: '15 ميكرون', es: '15 Micras', pt: '15 Microns' } },
    { id: 'bops-18', name: { zh: '18微米', en: '18 Micron', ar: '18 ميكرون', es: '18 Micras', pt: '18 Microns' } },
    { id: 'bops-20', name: { zh: '20微米', en: '20 Micron', ar: '20 ميكرون', es: '20 Micras', pt: '20 Microns' } },
    { id: 'bops-25', name: { zh: '25微米', en: '25 Micron', ar: '25 ميكرون', es: '25 Micras', pt: '25 Microns' } },
    { id: 'bops-30', name: { zh: '30微米', en: '30 Micron', ar: '30 ميكرون', es: '30 Micras', pt: '30 Microns' } },
    { id: 'bops-35', name: { zh: '35微米', en: '35 Micron', ar: '35 ميكرون', es: '35 Micras', pt: '35 Microns' } },
  ]},
  { id: 'cpp', name: { zh: 'CPP薄膜', en: 'CPP Film', ar: 'فيلم CPP', es: 'Película CPP', pt: 'Filme CPP' }, subcategories: [
    { id: 'cpp-20', name: { zh: '20微米', en: '20 Micron', ar: '20 ميكرون', es: '20 Micras', pt: '20 Microns' } },
    { id: 'cpp-25', name: { zh: '25微米', en: '25 Micron', ar: '25 ميكرون', es: '25 Micras', pt: '25 Microns' } },
    { id: 'cpp-30', name: { zh: '30微米', en: '30 Micron', ar: '30 ميكرون', es: '30 Micras', pt: '30 Microns' } },
    { id: 'cpp-35', name: { zh: '35微米', en: '35 Micron', ar: '35 ميكرون', es: '35 Micras', pt: '35 Microns' } },
    { id: 'cpp-40', name: { zh: '40微米', en: '40 Micron', ar: '40 ميكرون', es: '40 Micras', pt: '40 Microns' } },
    { id: 'cpp-50', name: { zh: '50微米', en: '50 Micron', ar: '50 ميكرون', es: '50 Micras', pt: '50 Microns' } },
  ]},
  { id: 'tape', name: { zh: '胶带产品', en: 'Tape Products', ar: 'منتجات الشريط', es: 'Productos de Cinta', pt: 'Produtos de Fita' }, subcategories: [
    { id: 'bopp-tape-prod', name: { zh: 'BOPP胶带', en: 'BOPP Tape', ar: 'شريط BOPP', es: 'Cinta BOPP', pt: 'Fita BOPP' } },
    { id: 'pet-tape', name: { zh: 'PET胶带', en: 'PET Tape', ar: 'شريط PET', es: 'Cinta PET', pt: 'Fita PET' } },
    { id: 'cpp-tape', name: { zh: 'CPP胶带', en: 'CPP Tape', ar: 'شريط CPP', es: 'Cinta CPP', pt: 'Fita CPP' } },
    { id: 'double-sided', name: { zh: '双面胶带', en: 'Double-sided Tape', ar: 'شريط مزدوج', es: 'Cinta de doble cara', pt: 'Fita dupla face' } },
    { id: 'masking-tape', name: { zh: '遮蔽胶带', en: 'Masking Tape', ar: 'شريط إخفاء', es: 'Cinta de enmascarar', pt: 'Fita de máscara' } },
    { id: 'packing-tape', name: { zh: '包装胶带', en: 'Packing Tape', ar: 'شريط تغليف', es: 'Cinta de empaquetado', pt: 'Fita de embalagem' } },
  ]},
  { id: 'specialty', name: { zh: '特种薄膜', en: 'Specialty Films', ar: 'أفلام خاصة', es: 'Películas Especiales', pt: 'Filmes Especiais' }, subcategories: [
    { id: 'anti-static', name: { zh: '抗静电膜', en: 'Anti-static Film', ar: 'فيلم مضاد للكهرباء', es: 'Película antiestática', pt: 'Filme antiestático' } },
    { id: 'flame-retardant', name: { zh: '阻燃膜', en: 'Flame Retardant Film', ar: 'فيلم مقاوم للحريق', es: 'Película ignífuga', pt: 'Filme retardante de chama' } },
    { id: 'high-temp', name: { zh: '耐高温膜', en: 'High Temperature Film', ar: 'فيلم مقاوم للحرارة', es: 'Película resistente al calor', pt: 'Filme resistente ao calor' } },
    { id: 'barrier-film', name: { zh: '高阻隔膜', en: 'High Barrier Film', ar: 'فيلم حاجز عالي', es: 'Película de barrera alta', pt: 'Filme de barreira alta' } },
  ]},
  { id: 'bopp-gloss', name: { zh: 'BOPP光膜', en: 'BOPP Gloss Film', ar: 'فيلم BOPP لامع', es: 'Película BOPP Brillante', pt: 'Filme BOPP Brilhante' }, subcategories: [
    { id: 'bopp-gloss-15', name: { zh: '15微米', en: '15 Micron', ar: '15 ميكرون', es: '15 Micras', pt: '15 Microns' } },
    { id: 'bopp-gloss-18', name: { zh: '18微米', en: '18 Micron', ar: '18 ميكرون', es: '18 Micras', pt: '18 Microns' } },
    { id: 'bopp-gloss-20', name: { zh: '20微米', en: '20 Micron', ar: '20 ميكرون', es: '20 Micras', pt: '20 Microns' } },
    { id: 'bopp-gloss-25', name: { zh: '25微米', en: '25 Micron', ar: '25 ميكرون', es: '25 Micras', pt: '25 Microns' } },
    { id: 'bopp-gloss-30', name: { zh: '30微米', en: '30 Micron', ar: '30 ميكرون', es: '30 Micras', pt: '30 Microns' } },
  ]},
  { id: 'bopp-matte', name: { zh: 'BOPP哑膜', en: 'BOPP Matte Film', ar: 'فيلم BOPP غير لامع', es: 'Película BOPP Mate', pt: 'Filme BOPP Fosco' }, subcategories: [
    { id: 'bopp-matte-18', name: { zh: '18微米', en: '18 Micron', ar: '18 ميكرون', es: '18 Micras', pt: '18 Microns' } },
    { id: 'bopp-matte-20', name: { zh: '20微米', en: '20 Micron', ar: '20 ميكرون', es: '20 Micras', pt: '20 Microns' } },
    { id: 'bopp-matte-25', name: { zh: '25微米', en: '25 Micron', ar: '25 ميكرون', es: '25 Micras', pt: '25 Microns' } },
    { id: 'bopp-matte-30', name: { zh: '30微米', en: '30 Micron', ar: '30 ميكرون', es: '30 Micras', pt: '30 Microns' } },
  ]},
  { id: 'bopp-metalized', name: { zh: 'BOPP镀铝膜', en: 'BOPP Metalized Film', ar: 'فيلم BOPP معدني', es: 'Película BOPP Metalizada', pt: 'Filme BOPP Metalizado' }, subcategories: [
    { id: 'bopp-metalized-18', name: { zh: '18微米', en: '18 Micron', ar: '18 ميكرون', es: '18 Micras', pt: '18 Microns' } },
    { id: 'bopp-metalized-20', name: { zh: '20微米', en: '20 Micron', ar: '20 ميكرون', es: '20 Micras', pt: '20 Microns' } },
    { id: 'bopp-metalized-25', name: { zh: '25微米', en: '25 Micron', ar: '25 ميكرون', es: '25 Micras', pt: '25 Microns' } },
    { id: 'bopp-metalized-30', name: { zh: '30微米', en: '30 Micron', ar: '30 ميكرون', es: '30 Micras', pt: '30 Microns' } },
  ]},
  { id: 'bopp-heatseal', name: { zh: 'BOPP热封膜', en: 'BOPP Heat Sealable Film', ar: 'فيلم BOPP قابل للحرار', es: 'Película BOPP Termosellable', pt: 'Filme BOPP Termosselável' }, subcategories: [
    { id: 'bopp-heatseal-20', name: { zh: '20微米', en: '20 Micron', ar: '20 ميكرون', es: '20 Micras', pt: '20 Microns' } },
    { id: 'bopp-heatseal-25', name: { zh: '25微米', en: '25 Micron', ar: '25 ميكرون', es: '25 Micras', pt: '25 Microns' } },
    { id: 'bopp-heatseal-30', name: { zh: '30微米', en: '30 Micron', ar: '30 ميكرون', es: '30 Micras', pt: '30 Microns' } },
    { id: 'bopp-heatseal-35', name: { zh: '35微米', en: '35 Micron', ar: '35 ميكرون', es: '35 Micras', pt: '35 Microns' } },
  ]},
  { id: 'bopp-white', name: { zh: 'BOPP白膜', en: 'BOPP White Opaque Film', ar: 'فيلم BOPP أبيض معتم', es: 'Película BOPP Blanca Opaca', pt: 'Filme BOPP Branco Opaco' }, subcategories: [
    { id: 'bopp-white-20', name: { zh: '20微米', en: '20 Micron', ar: '20 ميكرون', es: '20 Micras', pt: '20 Microns' } },
    { id: 'bopp-white-25', name: { zh: '25微米', en: '25 Micron', ar: '25 ميكرون', es: '25 Micras', pt: '25 Microns' } },
    { id: 'bopp-white-30', name: { zh: '30微米', en: '30 Micron', ar: '30 ميكرون', es: '30 Micras', pt: '30 Microns' } },
    { id: 'bopp-white-35', name: { zh: '35微米', en: '35 Micron', ar: '35 ميكرون', es: '35 Micras', pt: '35 Microns' } },
  ]},
  { id: 'bopp-tape', name: { zh: 'BOPP胶带膜', en: 'BOPP Tape Film', ar: 'فيلم BOPP شريط', es: 'Película BOPP de Cinta', pt: 'Filme BOPP de Fita' }, subcategories: [
    { id: 'bopp-tape-15', name: { zh: '15微米', en: '15 Micron', ar: '15 ميكرون', es: '15 Micras', pt: '15 Microns' } },
    { id: 'bopp-tape-18', name: { zh: '18微米', en: '18 Micron', ar: '18 ميكرون', es: '18 Micras', pt: '18 Microns' } },
    { id: 'bopp-tape-20', name: { zh: '20微米', en: '20 Micron', ar: '20 ميكرون', es: '20 Micras', pt: '20 Microns' } },
    { id: 'bopp-tape-25', name: { zh: '25微米', en: '25 Micron', ar: '25 ميكرون', es: '25 Micras', pt: '25 Microns' } },
  ]},
  { id: 'bopet', name: { zh: 'BOPET薄膜', en: 'BOPET Film', ar: 'فيلم BOPET', es: 'Película BOPET', pt: 'Filme BOPET' }, subcategories: [
    { id: 'bopet-12', name: { zh: '12微米', en: '12 Micron', ar: '12 ميكرون', es: '12 Micras', pt: '12 Microns' } },
    { id: 'bopet-15', name: { zh: '15微米', en: '15 Micron', ar: '15 ميكرون', es: '15 Micras', pt: '15 Microns' } },
    { id: 'bopet-18', name: { zh: '18微米', en: '18 Micron', ar: '18 ميكرون', es: '18 Micras', pt: '18 Microns' } },
    { id: 'bopet-20', name: { zh: '20微米', en: '20 Micron', ar: '20 ميكرون', es: '20 Micras', pt: '20 Microns' } },
    { id: 'bopet-25', name: { zh: '25微米', en: '25 Micron', ar: '25 ميكرون', es: '25 Micras', pt: '25 Microns' } },
    { id: 'bopet-30', name: { zh: '30微米', en: '30 Micron', ar: '30 ميكرون', es: '30 Micras', pt: '30 Microns' } },
    { id: 'bopet-35', name: { zh: '35微米', en: '35 Micron', ar: '35 ميكرون', es: '35 Micras', pt: '35 Microns' } },
    { id: 'bopet-50', name: { zh: '50微米', en: '50 Micron', ar: '50 ميكرون', es: '50 Micras', pt: '50 Microns' } },
  ]},
  { id: 'bops', name: { zh: 'BOPS薄膜', en: 'BOPS Film', ar: 'فيلم BOPS', es: 'Película BOPS', pt: 'Filme BOPS' }, subcategories: [
    { id: 'bops-15', name: { zh: '15微米', en: '15 Micron', ar: '15 ميكرون', es: '15 Micras', pt: '15 Microns' } },
    { id: 'bops-18', name: { zh: '18微米', en: '18 Micron', ar: '18 ميكرون', es: '18 Micras', pt: '18 Microns' } },
    { id: 'bops-20', name: { zh: '20微米', en: '20 Micron', ar: '20 ميكرون', es: '20 Micras', pt: '20 Microns' } },
    { id: 'bops-25', name: { zh: '25微米', en: '25 Micron', ar: '25 ميكرون', es: '25 Micras', pt: '25 Microns' } },
    { id: 'bops-30', name: { zh: '30微米', en: '30 Micron', ar: '30 ميكرون', es: '30 Micras', pt: '30 Microns' } },
    { id: 'bops-35', name: { zh: '35微米', en: '35 Micron', ar: '35 ميكرون', es: '35 Micras', pt: '35 Microns' } },
  ]},
  { id: 'cpp', name: { zh: 'CPP薄膜', en: 'CPP Film', ar: 'فيلم CPP', es: 'Película CPP', pt: 'Filme CPP' }, subcategories: [
    { id: 'cpp-20', name: { zh: '20微米', en: '20 Micron', ar: '20 ميكرون', es: '20 Micras', pt: '20 Microns' } },
    { id: 'cpp-25', name: { zh: '25微米', en: '25 Micron', ar: '25 ميكرون', es: '25 Micras', pt: '25 Microns' } },
    { id: 'cpp-30', name: { zh: '30微米', en: '30 Micron', ar: '30 ميكرون', es: '30 Micras', pt: '30 Microns' } },
    { id: 'cpp-35', name: { zh: '35微米', en: '35 Micron', ar: '35 ميكرون', es: '35 Micras', pt: '35 Microns' } },
    { id: 'cpp-40', name: { zh: '40微米', en: '40 Micron', ar: '40 ميكرون', es: '40 Micras', pt: '40 Microns' } },
    { id: 'cpp-50', name: { zh: '50微米', en: '50 Micron', ar: '50 ميكرون', es: '50 Micras', pt: '50 Microns' } },
  ]},
  { id: 'tape', name: { zh: '胶带产品', en: 'Tape Products', ar: 'منتجات الشريط', es: 'Productos de Cinta', pt: 'Produtos de Fita' }, subcategories: [
    { id: 'bopp-tape-prod', name: { zh: 'BOPP胶带', en: 'BOPP Tape', ar: 'شريط BOPP', es: 'Cinta BOPP', pt: 'Fita BOPP' } },
    { id: 'pet-tape', name: { zh: 'PET胶带', en: 'PET Tape', ar: 'شريط PET', es: 'Cinta PET', pt: 'Fita PET' } },
    { id: 'cpp-tape', name: { zh: 'CPP胶带', en: 'CPP Tape', ar: 'شريط CPP', es: 'Cinta CPP', pt: 'Fita CPP' } },
    { id: 'double-sided', name: { zh: '双面胶带', en: 'Double-sided Tape', ar: 'شريط مزدوج', es: 'Cinta de doble cara', pt: 'Fita dupla face' } },
    { id: 'masking-tape', name: { zh: '遮蔽胶带', en: 'Masking Tape', ar: 'شريط إخفاء', es: 'Cinta de enmascarar', pt: 'Fita de máscara' } },
    { id: 'packing-tape', name: { zh: '包装胶带', en: 'Packing Tape', ar: 'شريط تغليف', es: 'Cinta de empaquetado', pt: 'Fita de embalagem' } },
  ]},
  { id: 'specialty', name: { zh: '特种薄膜', en: 'Specialty Films', ar: 'أفلام خاصة', es: 'Películas Especiales', pt: 'Filmes Especiais' }, subcategories: [
    { id: 'anti-static', name: { zh: '抗静电膜', en: 'Anti-static Film', ar: 'فيلم مضاد للكهرباء', es: 'Película antiestática', pt: 'Filme antiestático' } },
    { id: 'flame-retardant', name: { zh: '阻燃膜', en: 'Flame Retardant Film', ar: 'فيلم مقاوم للحريق', es: 'Película ignífuga', pt: 'Filme retardante de chama' } },
    { id: 'high-temp', name: { zh: '耐高温膜', en: 'High Temperature Film', ar: 'فيلم مقاوم للحرارة', es: 'Película resistente al calor', pt: 'Filme resistente ao calor' } },
    { id: 'barrier-film', name: { zh: '高阻隔膜', en: 'High Barrier Film', ar: 'فيلم حاجز عالي', es: 'Película de barrera alta', pt: 'Filme de barreira alta' } },
  ]},
];