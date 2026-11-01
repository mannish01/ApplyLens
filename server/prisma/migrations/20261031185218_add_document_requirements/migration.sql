-- CreateTable
CREATE TABLE "document_requirements" (
    "id" UUID NOT NULL,
    "documentId" UUID NOT NULL,
    "category" "RequirementCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "isMandatory" BOOLEAN NOT NULL DEFAULT true,
    "expectedValue" TEXT,
    "pageNumber" INTEGER NOT NULL,
    "quote" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "document_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "document_requirements_documentId_idx" ON "document_requirements"("documentId");

-- CreateIndex
CREATE INDEX "document_requirements_documentId_category_idx" ON "document_requirements"("documentId", "category");

-- AddForeignKey
ALTER TABLE "document_requirements" ADD CONSTRAINT "document_requirements_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
