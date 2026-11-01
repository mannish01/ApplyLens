import { prisma } from '../lib/prisma.js';
import { AppError } from '../utils/AppError.js';
import { extractPdfText } from './pdfExtraction.service.js';

export async function processDocument(
  documentId: string,
  userId: string,
) {
  const document = await prisma.document.findFirst({
    where: {
      id: documentId,
      userId,
    },
  });

  if (!document) {
    throw new AppError('Document not found.', 404);
  }

  await prisma.document.update({
    where: { id: document.id },
    data: { status: 'PROCESSING' },
  });

  try {
    const extracted = await extractPdfText(
      document.storageKey,
    );

    await prisma.$transaction(async (tx) => {
      await tx.documentPage.deleteMany({
        where: { documentId: document.id },
      });

      await tx.documentPage.createMany({
        data: extracted.pages.map((page) => ({
          documentId: document.id,
          pageNumber: page.pageNumber,
          text: page.text,
        })),
      });

      await tx.document.update({
        where: { id: document.id },
        data: {
          extractedText: extracted.fullText,
          totalPages: extracted.totalPages,
          processedAt: new Date(),
          status: 'PROCESSED',
        },
      });
    });

    return {
      documentId: document.id,
      totalPages: extracted.totalPages,
      extractedText: extracted.fullText,
    };
  } catch (error) {
    await prisma.document.update({
      where: { id: document.id },
      data: { status: 'FAILED' },
    });

    throw error;
  }
}
