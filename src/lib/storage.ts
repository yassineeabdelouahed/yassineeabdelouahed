import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 Mo

export class FileValidationError extends Error {}

/**
 * Allowlist of accepted document types for CV uploads, matched by declared MIME type
 * AND file-signature ("magic bytes") — the client-reported type/extension is never
 * trusted alone, since both are trivially spoofable. The trusted extension (not the
 * client's) is used for the stored filename.
 */
const ALLOWED_DOCUMENT_TYPES: {
  mime: string;
  ext: string;
  magic: (buf: Buffer) => boolean;
}[] = [
  {
    mime: "application/pdf",
    ext: ".pdf",
    magic: (buf) => buf.subarray(0, 4).toString("latin1") === "%PDF",
  },
  {
    mime: "application/msword",
    ext: ".doc",
    // legacy OLE compound file signature
    magic: (buf) => buf.length >= 4 && buf[0] === 0xd0 && buf[1] === 0xcf && buf[2] === 0x11 && buf[3] === 0xe0,
  },
  {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ext: ".docx",
    // .docx is a zip archive: "PK\x03\x04" signature
    magic: (buf) => buf.length >= 4 && buf[0] === 0x50 && buf[1] === 0x4b,
  },
];

/**
 * Local-disk storage adapter (dev/demo scope — see plan §6 "cut corners").
 * Swap the implementation for an S3-compatible client later; callers only depend
 * on the returned public URL, not on how/where the file physically lives.
 *
 * Throws FileValidationError (safe to show to the user) on oversized or
 * unrecognized files — callers should catch it and surface result.error rather
 * than letting it bubble as an unhandled server error.
 */
export async function saveUploadedFile(file: File, subdir: string): Promise<string> {
  if (file.size === 0) {
    throw new FileValidationError("Le fichier est vide.");
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new FileValidationError("Le fichier dépasse la taille maximale autorisée (5 Mo).");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const matched = ALLOWED_DOCUMENT_TYPES.find((t) => t.mime === file.type && t.magic(buffer));
  if (!matched) {
    throw new FileValidationError("Format de fichier non autorisé. Formats acceptés : PDF, DOC, DOCX.");
  }

  const dir = path.join(UPLOAD_ROOT, subdir);
  await mkdir(dir, { recursive: true });

  const filename = `${randomUUID()}${matched.ext}`;
  await writeFile(path.join(dir, filename), buffer);

  return `/uploads/${subdir}/${filename}`;
}
