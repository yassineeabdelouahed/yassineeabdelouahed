import { authenticator } from "otplib";
import QRCode from "qrcode";
import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";

const ISSUER = "Talentis Connect";

export function generateTotpSecret(): string {
  return authenticator.generateSecret();
}

export async function generateTotpQrCode(email: string, secret: string): Promise<string> {
  const otpauthUrl = authenticator.keyuri(email, ISSUER, secret);
  return QRCode.toDataURL(otpauthUrl);
}

export function verifyTotpToken(token: string, secret: string): boolean {
  try {
    return authenticator.verify({ token, secret });
  } catch {
    return false;
  }
}

const BACKUP_CODE_COUNT = 8;

/** Returns plaintext codes (shown once to the user) and their bcrypt hashes (stored). */
export async function generateBackupCodes(): Promise<{ plaintext: string[]; hashed: string[] }> {
  const plaintext = Array.from({ length: BACKUP_CODE_COUNT }, () =>
    randomBytes(5).toString("hex").toUpperCase(),
  );
  const hashed = await Promise.all(plaintext.map((code) => bcrypt.hash(code, 10)));
  return { plaintext, hashed };
}

/** Returns the index of the matching backup code hash, or -1 if none match. */
export async function findMatchingBackupCode(code: string, hashedCodes: string[]): Promise<number> {
  for (let i = 0; i < hashedCodes.length; i++) {
    if (await bcrypt.compare(code, hashedCodes[i])) return i;
  }
  return -1;
}
