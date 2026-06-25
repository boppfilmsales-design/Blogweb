-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameZh" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionZh" TEXT NOT NULL,
    "thickness" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "length" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "featuresEn" TEXT NOT NULL,
    "featuresZh" TEXT NOT NULL,
    "applicationsEn" TEXT NOT NULL,
    "applicationsZh" TEXT NOT NULL,
    "certifications" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
