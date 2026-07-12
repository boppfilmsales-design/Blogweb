-- Seed initial products - run this in Supabase SQL Editor

INSERT INTO "Product" ("id", "slug", "nameEn", "nameZh", "category", "descriptionEn", "descriptionZh", "thickness", "width", "length", "weight", "color", "material", "featuresEn", "featuresZh", "applicationsEn", "applicationsZh", "certifications", "images", "featured") VALUES
('1', 'bopp-gloss-15', 'BOPP Gloss Film 15 Micron', 'BOPP光膜 15微米', 'bopp-gloss', 'Ultra-thin BOPP gloss film with 15 micron thickness, featuring exceptional transparency and gloss. Ideal for high-speed printing and precision packaging.', '超薄BOPP光膜，厚度15微米，具有卓越的透明度和光泽度。适用于高速印刷和精密包装。', '15 microns', '200-1200mm', '3000-6000m', 'Customized', 'Transparent', 'Polypropylene', 'Ultra-thin design
High transparency
Excellent gloss
High-speed printing
Superior moisture barrier', '超薄设计
高透明度
优异光泽度
高速印刷适用
优异防潮性能', 'Food packaging
Printing lamination
Label making
Gift wrapping', '食品包装
印刷覆膜
标签制作
礼品包装', 'ISO 9001
FDA
SGS
RoHS', '/images/products/bopp-gloss-15.jpg', true),
('2', 'bopp-gloss-18', 'BOPP Gloss Film 18 Micron', 'BOPP光膜 18微米', 'bopp-gloss', 'Standard BOPP gloss film with 18 micron thickness, balancing transparency, strength and printability.', '标准BOPP光膜，厚度18微米，平衡了透明度、强度和印刷适性。', '18 microns', '200-1400mm', '2500-5000m', 'Customized', 'Transparent', 'Polypropylene', 'Standard thickness
Balanced performance
Good transparency
Excellent printability', '标准厚度
平衡性能
良好透明度
优异印刷适性', 'Food packaging
Daily necessities packaging
Printing lamination
Label making', '食品包装
日用品包装
印刷覆膜
标签制作', 'ISO 9001
FDA
SGS
RoHS', '/images/products/bopp-gloss-18.jpg', true),
('28', 'bopet-4.5-ttr', 'BOPET TTR Film 4.5 Micron', 'BOPET TTR薄膜 4.5微米', 'bopet', 'Ultra-thin BOPET TTR film with 4.5 micron thickness, featuring excellent transparency and thermal transfer properties.', '超薄BOPET TTR薄膜，厚度4.5微米，具有卓越的透明度和热转印性能。', '4.5 microns', '200-1200mm', '4000-8000m', 'Customized', 'Transparent', 'Polyethylene Terephthalate', 'Ultra-thin design
High transparency
Excellent thermal transfer
High-speed printing', '超薄设计
高透明度
优异热转印性能
高速印刷适用', 'Thermal transfer labels
High-speed printing
Food packaging
Pharmaceutical packaging', '热转印标签
高速印刷
食品包装
药品包装', 'ISO 9001
FDA
SGS
RoHS', '/images/products/bopet-4.5-ttr.jpg', true);

-- Add more products as needed...