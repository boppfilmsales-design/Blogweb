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
  {
    id: '1',
    slug: 'gloss-bopp-film',
    name: {
      zh: '光面BOPP薄膜',
      en: 'Glossy BOPP Film',
      ar: 'فيلم BOPP لامع',
      es: 'Película BOPP Brillante',
      pt: 'Filme BOPP Brilhante',
    },
    category: 'gloss',
    description: {
      zh: '高品质光面BOPP薄膜，具有优异的光学性能和印刷适性。适用于各种印刷和包装应用，提供卓越的透明度和光泽度。',
      en: 'High-quality glossy BOPP film with excellent optical properties and printability. Suitable for various printing and packaging applications, providing superior clarity and gloss.',
      ar: 'فيلم BOPP لامع عالي الجودة مع خصائص بصرية ممتازة وقابلية للطباعة. مناسب لتطبيقات الطباعة والتغليف المختلفة، مما يوفر وضوحًا وتلألؤًا فائقين.',
      es: 'Película BOPP brillante de alta calidad con excelentes propiedades ópticas e imprimibilidad. Adecuada para diversas aplicaciones de impresión y empaquetado, proporcionando claridad y brillo superiores.',
      pt: 'Filme BOPP brilhante de alta qualidade com excelentes propriedades ópticas e imprimibilidade. Adequado para várias aplicações de impressão e embalagem, proporcionando clareza e brilho superiores.',
    },
    specifications: {
      thickness: '15-50 microns',
      width: '200-1600mm',
      length: '2000-6000m',
      weight: 'Customized',
      color: 'Transparent',
      material: 'Polypropylene',
    },
    features: {
      zh: ['高透明度', '优异光泽度', '良好印刷适性', '优异防潮性能', '高强度和挺度'],
      en: ['High transparency', 'Excellent gloss', 'Good printability', 'Superior moisture barrier', 'High strength and stiffness'],
      ar: ['شفافية عالية', 'لمعان ممتاز', 'قابلية طباعة جيدة', 'حاجز رطوبة فائق', 'قوة وصلابة عالية'],
      es: ['Alta transparencia', 'Excelente brillo', 'Buena imprimibilidad', 'Barrera de humedad superior', 'Alta resistencia y rigidez'],
      pt: ['Alta transparência', 'Excelente brilho', 'Boa imprimibilidade', 'Barreira de umidade superior', 'Alta resistência e rigidez'],
    },
    applications: {
      zh: ['食品包装', '印刷覆膜', '标签制作', '礼品包装', '文具包装'],
      en: ['Food packaging', 'Printing lamination', 'Label making', 'Gift wrapping', 'Stationery packaging'],
      ar: ['تغليف المواد الغذائية', 'تصفيح الطباعة', 'صنع الملصقات', 'تغليف الهدايا', 'تغليف القرطاسية'],
      es: ['Empaquetado de alimentos', 'Laminación de impresión', 'Fabricación de etiquetas', 'Envoltura de regalos', 'Empaquetado de papelería'],
      pt: ['Embalagem de alimentos', 'Laminação de impressão', 'Fabricação de etiquetas', 'Embalagem de presentes', 'Embalagem de papelaria'],
    },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'],
    images: ['/images/products/gloss-bopp-1.jpg', '/images/products/gloss-bopp-2.jpg'],
    featured: true,
  },
  {
    id: '2',
    slug: 'matte-bopp-film',
    name: {
      zh: '哑光BOPP薄膜',
      en: 'Matte BOPP Film',
      ar: 'فيلم BOPP غير لامع',
      es: 'Película BOPP Mate',
      pt: 'Filme BOPP Fosco',
    },
    category: 'matte',
    description: {
      zh: '优质哑光BOPP薄膜，表面呈现柔和的哑光效果。适用于高端包装和印刷产品，提供优雅的外观和良好的印刷适性。',
      en: 'Premium matte BOPP film with a soft matte finish on the surface. Suitable for high-end packaging and printing products, providing elegant appearance and good printability.',
      ar: 'فيلم BOPP غير لامع متميز مع تشطيب غير لامع ناعم على السطح. مناسب للتغليف والطباعة عالية الجودة، مما يوفر مظهرًا أنيقًا وقابلية طباعة جيدة.',
      es: 'Película BOPP mate premium con un acabado mate suave en la superficie. Adecuada para empaquetado e impresión de alta gama, proporcionando apariencia elegante y buena imprimibilidad.',
      pt: 'Filme BOPP fosco premium com acabamento fosco suave na superfície. Adequado para embalagem e impressão de alta qualidade, proporcionando aparência elegante e boa imprimibilidade.',
    },
    specifications: {
      thickness: '18-50 microns',
      width: '200-1600mm',
      length: '2000-6000m',
      weight: 'Customized',
      color: 'Matte White',
      material: 'Polypropylene',
    },
    features: {
      zh: ['柔和哑光效果', '良好印刷适性', '优异抗静电性能', '良好热封性能', '环保无毒'],
      en: ['Soft matte effect', 'Good printability', 'Excellent anti-static properties', 'Good heat sealability', 'Eco-friendly and non-toxic'],
      ar: ['تأثير غير لامع ناعم', 'قابلية طباعة جيدة', 'خصائص مضادة للكهرباء الساكنة ممتازة', 'قابلية إغلاق حراري جيدة', 'صديق للبيئة وغير سام'],
      es: ['Efecto mate suave', 'Buena imprimibilidad', 'Excelentes propiedades antiestáticas', 'Buena termosellabilidad', 'Ecológico y no tóxico'],
      pt: ['Efeito fosco suave', 'Boa imprimibilidade', 'Excelentes propriedades antiestáticas', 'Boa selabilidade a quente', 'Ecológico e não tóxico'],
    },
    applications: {
      zh: ['高端食品包装', '化妆品包装', '药品包装', '标签制作', '印刷覆膜'],
      en: ['High-end food packaging', 'Cosmetic packaging', 'Pharmaceutical packaging', 'Label making', 'Printing lamination'],
      ar: ['تغليف المواد الغذائية عالية الجودة', 'تغليف مستحضرات التجميل', 'تغليف المستحضرات الصيدلانية', 'صنع الملصقات', 'تصفيح الطباعة'],
      es: ['Empaquetado de alimentos de alta gama', 'Empaquetado de cosméticos', 'Empaquetado farmacéutico', 'Fabricación de etiquetas', 'Laminación de impresión'],
      pt: ['Embalagem de alimentos de alta qualidade', 'Embalagem de cosméticos', 'Embalagem farmacêutica', 'Fabricação de etiquetas', 'Laminação de impressão'],
    },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'],
    images: ['/images/products/matte-bopp-1.jpg', '/images/products/matte-bopp-2.jpg'],
    featured: true,
  },
  {
    id: '3',
    slug: 'metalized-bopp-film',
    name: {
      zh: '镀铝BOPP薄膜',
      en: 'Metalized BOPP Film',
      ar: 'فيلم BOPP معدني',
      es: 'Película BOPP Metalizada',
      pt: 'Filme BOPP Metalizado',
    },
    category: 'metalized',
    description: {
      zh: '高品质镀铝BOPP薄膜，具有优异的阻隔性能和金属光泽。广泛应用于食品包装、药品包装和其他需要高阻隔性能的领域。',
      en: 'High-quality metalized BOPP film with excellent barrier properties and metallic luster. Widely used in food packaging, pharmaceutical packaging and other fields requiring high barrier performance.',
      ar: 'فيلم BOPP معدني عالي الجودة مع خصائص حاجزة ممتازة وبريق معدني. يُستخدم على نطاق واسع في تغليف المواد الغذائية وتغليف المستحضرات الصيدلانية والمجالات الأخرى التي تتطلب أداء حاجز عالي.',
      es: 'Película BOPP metalizada de alta calidad con excelentes propiedades de barrera y brillo metálico. Ampliamente utilizada en empaquetado de alimentos, empaquetado farmacéutico y otros campos que requieren alto rendimiento de barrera.',
      pt: 'Filme BOPP metalizado de alta qualidade com excelentes propriedades de barreira e brilho metálico. Amplamente utilizado em embalagens de alimentos, embalagens farmacêuticas e outros campos que exigem alto desempenho de barreira.',
    },
    specifications: {
      thickness: '18-50 microns',
      width: '200-1600mm',
      length: '2000-6000m',
      weight: 'Customized',
      color: 'Silver/Metallic',
      material: 'Polypropylene + Aluminum',
    },
    features: {
      zh: ['优异阻隔性能', '金属光泽效果', '良好热封性能', '优异抗静电性能', '环保材料'],
      en: ['Excellent barrier properties', 'Metallic luster effect', 'Good heat sealability', 'Excellent anti-static properties', 'Eco-friendly material'],
      ar: ['خصائص حاجزة ممتازة', 'تأثير بريق معدني', 'قابلية إغلاق حراري جيدة', 'خصائص مضادة للكهرباء الساكنة ممتازة', 'مادة صديقة للبيئة'],
      es: ['Excelentes propiedades de barrera', 'Efecto de brillo metálico', 'Buena termosellabilidad', 'Excelentes propiedades antiestáticas', 'Material ecológico'],
      pt: ['Excelentes propriedades de barreira', 'Efeito de brilho metálico', 'Boa selabilidade a quente', 'Excelentes propriedades antiestáticas', 'Material ecológico'],
    },
    applications: {
      zh: ['食品包装', '药品包装', '化妆品包装', '电子产品包装', '烟草包装'],
      en: ['Food packaging', 'Pharmaceutical packaging', 'Cosmetic packaging', 'Electronics packaging', 'Tobacco packaging'],
      ar: ['تغليف المواد الغذائية', 'تغليف المستحضرات الصيدلانية', 'تغليف مستحضرات التجميل', 'تغليف الإلكترونيات', 'تغليف التبغ'],
      es: ['Empaquetado de alimentos', 'Empaquetado farmacéutico', 'Empaquetado de cosméticos', 'Empaquetado de electrónicos', 'Empaquetado de tabaco'],
      pt: ['Embalagem de alimentos', 'Embalagem farmacêutica', 'Embalagem de cosméticos', 'Embalagem de eletrônicos', 'Embalagem de tabaco'],
    },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'],
    images: ['/images/products/metalized-bopp-1.jpg', '/images/products/metalized-bopp-2.jpg'],
    featured: true,
  },
  {
    id: '4',
    slug: 'heat-sealable-bopp-film',
    name: {
      zh: '热封BOPP薄膜',
      en: 'Heat Sealable BOPP Film',
      ar: 'فيلم BOPP قابل للحرار',
      es: 'Película BOPP Termosellable',
      pt: 'Filme BOPP Termosselável',
    },
    category: 'heatSeal',
    description: {
      zh: '专业热封BOPP薄膜，具有优异的热封性能和封口强度。适用于各种自动包装机和热封设备，提供可靠的包装解决方案。',
      en: 'Professional heat sealable BOPP film with excellent heat seal performance and seal strength. Suitable for various automatic packaging machines and heat sealing equipment, providing reliable packaging solutions.',
      ar: 'فيلم BOPP قابل للحرار احترافي مع أداء إغلاق حراري ممتاز وقوة إغلاق. مناسب لآلات التغليف التلقائية المختلفة ومعدات الإغلاق الحراري، مما يوفر حلول تغليف موثوقة.',
      es: 'Película BOPP termosellable profesional con excelente rendimiento de termosellado y fuerza de sellado. Adecuada para diversas máquinas de empaquetado automático y equipos de termosellado, proporcionando soluciones de empaquetado confiables.',
      pt: 'Filme BOPP termosselável profissional com excelente desempenho de selagem a quente e força de selagem. Adequado para várias máquinas de embalagem automática e equipamentos de selagem a quente, fornecendo soluções de embalagem confiáveis.',
    },
    specifications: {
      thickness: '20-50 microns',
      width: '200-1600mm',
      length: '2000-6000m',
      weight: 'Customized',
      color: 'Transparent',
      material: 'Polypropylene',
    },
    features: {
      zh: ['优异热封性能', '高封口强度', '良好耐热性', '优异抗静电性能', '适合高速包装'],
      en: ['Excellent heat seal performance', 'High seal strength', 'Good heat resistance', 'Excellent anti-static properties', 'Suitable for high-speed packaging'],
      ar: ['أداء إغلاق حراري ممتاز', 'قوة إغلاق عالية', 'مقاومة حرارية جيدة', 'خصائص مضادة للكهرباء الساكنة ممتازة', 'مناسب للتغليف عالي السرعة'],
      es: ['Excelente rendimiento de termosellado', 'Alta fuerza de sellado', 'Buena resistencia al calor', 'Excelentes propiedades antiestáticas', 'Adecuado para empaquetado de alta velocidad'],
      pt: ['Excelente desempenho de selagem a quente', 'Alta força de selagem', 'Boa resistência ao calor', 'Excelentes propriedades antiestáticas', 'Adequado para embalagem de alta velocidade'],
    },
    applications: {
      zh: ['自动包装机', '食品包装', '药品包装', '日用品包装', '工业包装'],
      en: ['Automatic packaging machines', 'Food packaging', 'Pharmaceutical packaging', 'Daily necessities packaging', 'Industrial packaging'],
      ar: ['آلات التغليف التلقائية', 'تغليف المواد الغذائية', 'تغليف المستحضرات الصيدلانية', 'تغليف الضروريات اليومية', 'التغليف الصناعي'],
      es: ['Máquinas de empaquetado automático', 'Empaquetado de alimentos', 'Empaquetado farmacéutico', 'Empaquetado de artículos de uso diario', 'Empaquetado industrial'],
      pt: ['Máquinas de embalagem automática', 'Embalagem de alimentos', 'Embalagem farmacêutica', 'Embalagem de artigos de uso diário', 'Embalagem industrial'],
    },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'],
    images: ['/images/products/heat-sealable-bopp-1.jpg', '/images/products/heat-sealable-bopp-2.jpg'],
    featured: true,
  },
  {
    id: '5',
    slug: 'white-opaque-bopp-film',
    name: {
      zh: '白色不透明BOPP薄膜',
      en: 'White Opaque BOPP Film',
      ar: 'فيلم BOPP أبيض معتم',
      es: 'Película BOPP Blanca Opaca',
      pt: 'Filme BOPP Branco Opaco',
    },
    category: 'whiteOpaque',
    description: {
      zh: '高品质白色不透明BOPP薄膜，具有良好的遮光性和印刷适性。适用于标签、包装和其他需要不透明效果的应用。',
      en: 'High-quality white opaque BOPP film with good opacity and printability. Suitable for labels, packaging and other applications requiring opaque effects.',
      ar: 'فيلم BOPP أبيض معتم عالي الجودة مع عتامة جيدة وقابلية للطباعة. مناسب للملصقات والتغليف والتطبيقات الأخرى التي تتطلب تأثيرات معتمة.',
      es: 'Película BOPP blanca opaca de alta calidad con buena opacidad e imprimibilidad. Adecuada para etiquetas, empaquetado y otras aplicaciones que requieren efectos opacos.',
      pt: 'Filme BOPP branco opaco de alta qualidade com boa opacidade e imprimibilidade. Adequado para etiquetas, embalagem e outras aplicações que requerem efeitos opacos.',
    },
    specifications: {
      thickness: '20-50 microns',
      width: '200-1600mm',
      length: '2000-6000m',
      weight: 'Customized',
      color: 'White',
      material: 'Polypropylene',
    },
    features: {
      zh: ['良好遮光性', '优异印刷适性', '良好耐热性', '优异抗静电性能', '环保材料'],
      en: ['Good opacity', 'Excellent printability', 'Good heat resistance', 'Excellent anti-static properties', 'Eco-friendly material'],
      ar: ['عتامة جيدة', 'قابلية طباعة ممتازة', 'مقاومة حرارية جيدة', 'خصائص مضادة للكهرباء الساكنة ممتازة', 'مادة صديقة للبيئة'],
      es: ['Buena opacidad', 'Excelente imprimibilidad', 'Buena resistencia al calor', 'Excelentes propiedades antiestáticas', 'Material ecológico'],
      pt: ['Boa opacidade', 'Excelente imprimibilidade', 'Boa resistência ao calor', 'Excelentes propriedades antiestáticas', 'Material ecológico'],
    },
    applications: {
      zh: ['标签制作', '食品包装', '药品包装', '化妆品包装', '文具包装'],
      en: ['Label making', 'Food packaging', 'Pharmaceutical packaging', 'Cosmetic packaging', 'Stationery packaging'],
      ar: ['صنع الملصقات', 'تغليف المواد الغذائية', 'تغليف المستحضرات الصيدلانية', 'تغليف مستحضرات التجميل', 'تغليف القرطاسية'],
      es: ['Fabricación de etiquetas', 'Empaquetado de alimentos', 'Empaquetado farmacéutico', 'Empaquetado de cosméticos', 'Empaquetado de papelería'],
      pt: ['Fabricação de etiquetas', 'Embalagem de alimentos', 'Embalagem farmacêutica', 'Embalagem de cosméticos', 'Embalagem de papelaria'],
    },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'],
    images: ['/images/products/white-opaque-bopp-1.jpg', '/images/products/white-opaque-bopp-2.jpg'],
    featured: false,
  },
  {
    id: '6',
    slug: 'tape-bopp-film',
    name: {
      zh: '胶带BOPP薄膜',
      en: 'Tape BOPP Film',
      ar: 'فيلم BOPP شريط',
      es: 'Película BOPP de Cinta',
      pt: 'Filme BOPP de Fita',
    },
    category: 'tape',
    description: {
      zh: '专业胶带BOPP薄膜，具有优异的拉伸强度和粘性。适用于各种胶带产品，提供可靠的粘合性能。',
      en: 'Professional tape BOPP film with excellent tensile strength and adhesion. Suitable for various tape products, providing reliable adhesive performance.',
      ar: 'فيلم BOPP شريط احترافي مع قوة شد ممتازة والتصاق. مناسب لمنتجات الشريط المختلفة، مما يوفر أداء لاصق موثوق.',
      es: 'Película BOPP de cinta profesional con excelente resistencia a la tracción y adhesión. Adecuada para varios productos de cinta, proporcionando rendimiento adhesivo confiable.',
      pt: 'Filme BOPP de fita profissional com excelente resistência à tração e adesão. Adequado para vários produtos de fita, fornecendo desempenho adesivo confiável.',
    },
    specifications: {
      thickness: '15-50 microns',
      width: '200-1600mm',
      length: '2000-6000m',
      weight: 'Customized',
      color: 'Transparent/Brown',
      material: 'Polypropylene',
    },
    features: {
      zh: ['优异拉伸强度', '良好粘性', '良好耐热性', '优异抗静电性能', '适合高速涂布'],
      en: ['Excellent tensile strength', 'Good adhesion', 'Good heat resistance', 'Excellent anti-static properties', 'Suitable for high-speed coating'],
      ar: ['قوة شد ممتازة', 'التصاق جيد', 'مقاومة حرارية جيدة', 'خصائص مضادة للكهرباء الساكنة ممتازة', 'مناسب للطلاء عالي السرعة'],
      es: ['Excelente resistencia a la tracción', 'Buena adhesión', 'Buena resistencia al calor', 'Excelentes propiedades antiestáticas', 'Adecuado para recubrimiento de alta velocidad'],
      pt: ['Excelente resistência à tração', 'Boa adesão', 'Boa resistência ao calor', 'Excelentes propriedades antiestáticas', 'Adequado para revestimento de alta velocidade'],
    },
    applications: {
      zh: ['胶带生产', '包装胶带', '文具胶带', '工业胶带', '双面胶带'],
      en: ['Tape production', 'Packaging tape', 'Stationery tape', 'Industrial tape', 'Double-sided tape'],
      ar: ['إنتاج الشريط', 'شريط التغليف', 'شريط القرطاسية', 'الشريط الصناعي', 'شريط مزدوج الوجه'],
      es: ['Producción de cinta', 'Cinta de empaquetado', 'Cinta de papelería', 'Cinta industrial', 'Cinta de doble cara'],
      pt: ['Produção de fita', 'Fita de embalagem', 'Fita de papelaria', 'Fita industrial', 'Fita dupla face'],
    },
    certifications: ['ISO 9001', 'FDA', 'SGS', 'RoHS'],
    images: ['/images/products/tape-bopp-1.jpg', '/images/products/tape-bopp-2.jpg'],
    featured: false,
  },
];

export const categories = [
  { id: 'all', name: { zh: '全部产品', en: 'All Products', ar: 'جميع المنتجات', es: 'Todos los Productos', pt: 'Todos os Produtos' } },
  { id: 'gloss', name: { zh: '光膜', en: 'Gloss Film', ar: 'فيلم لامع', es: 'Película Brillante', pt: 'Filme Brilhante' } },
  { id: 'matte', name: { zh: '哑膜', en: 'Matte Film', ar: 'فيلم غير لامع', es: 'Película Mate', pt: 'Filme Fosco' } },
  { id: 'metalized', name: { zh: '镀铝膜', en: 'Metalized Film', ar: 'فيلم معدني', es: 'Película Metalizada', pt: 'Filme Metalizado' } },
  { id: 'heatSeal', name: { zh: '热封膜', en: 'Heat Sealable Film', ar: 'فيلم قابل للحرار', es: 'Película Termosellable', pt: 'Filme Termosselável' } },
  { id: 'whiteOpaque', name: { zh: '白膜', en: 'White Opaque Film', ar: 'فيلم أبيض معتم', es: 'Película Blanca Opaca', pt: '