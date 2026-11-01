import { PDFParse } from 'pdf-parse';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { AppError } from '../utils/AppError.js';

const STORAGE_DIRECTORY = path.resolve(
  process.cwd(),
  'storage',
  'documents',
);

export interface ExtractedPage {
  pageNumber: number;
  text: string;
}

export interface ExtractedPdf {
  totalPages: number;
  pages: ExtractedPage[];
  fullText: string;
}

export async function extractPdfText(
  storageKey: string,
): Promise<ExtractedPdf> {
  const safeStorageKey = path.basename(storageKey);

  const filePath = path.join(
    STORAGE_DIRECTORY,
    safeStorageKey,
  );

  const buffer = await readFile(filePath);

  const parser = new PDFParse({
    data: new Uint8Array(buffer),
  });

  try {
    const result = await parser.getText();

    const pages = result.pages.map((page) => ({
      pageNumber: page.num,
      text: page.text.trim(),
    }));

    const fullText = pages
      .map((page) => page.text)
      .join('\n\n');

    if (!fullText.trim()) {
      throw new AppError(
        'No readable text found. This PDF may be scanned.',
        422,
      );
    }

    return {
      totalPages: pages.length,
      pages,
      fullText,
    };
  } finally {
    await parser.destroy();
  }
}
