-- CreateIndex
CREATE INDEX "Click_productId_idx" ON "Click"("productId");

-- CreateIndex
CREATE INDEX "Product_entrepreneurId_idx" ON "Product"("entrepreneurId");

-- CreateIndex
CREATE INDEX "Product_available_idx" ON "Product"("available");

-- CreateIndex
CREATE INDEX "Product_entrepreneurId_available_idx" ON "Product"("entrepreneurId", "available");
