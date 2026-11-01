-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "extractedText" TEXT,
ADD COLUMN     "processedAt" TIMESTAMP(3),
ADD COLUMN     "totalPages" INTEGER;

-- CreateTable
CREATE TABLE "document_pages" (
    "id" UUID NOT NULL,
    "documentId" UUID NOT NULL,
    "pageNumber" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "document_pages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "document_pages_documentId_idx" ON "document_pages"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "document_pages_documentId_pageNumber_key" ON "document_pages"("documentId", "pageNumber");

-- AddForeignKey
ALTER TABLE "document_pages" ADD CONSTRAINT "document_pages_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
