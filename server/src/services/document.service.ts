import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { mkdir, writeFile, unlink } from 'node:fs/promises';

import { prisma } from '../lib/prisma.js';

interface UploadedPdf {
  originalName: string;
  buffer: Buffer;
  size: number;
  mimetype: string;
}

const STORAGE_DIRECTORY = path.resolve(
  process.cwd(),
  'storage',
  'documents',
);

export async function saveDocument(
  userId: string,
  file: UploadedPdf,
) {
  await mkdir(STORAGE_DIRECTORY, { recursive: true });

  const storageKey = `${randomUUID()}.pdf`;

  const filePath = path.join(STORAGE_DIRECTORY, storageKey);

  await writeFile(filePath, file.buffer, { flag: 'wx' });

  try {
    const document = await prisma.document.create({
      data: {
        userId,
        originalName: path.basename(file.originalName),
        storageKey,
        mimeType: 'application/pdf',
        sizeBytes: file.size,
        status: 'UPLOADED',
      },
    });

    return {
      id: document.id,
      originalName: document.originalName,
      mimeType: document.mimeType,
      sizeBytes: document.sizeBytes,
      status: document.status,
      createdAt: document.createdAt,
    };
  } catch (error) {
    await unlink(filePath).catch(() => undefined);
    throw error;
  }
}
