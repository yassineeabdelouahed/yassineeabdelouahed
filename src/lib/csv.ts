/** Minimal RFC 4180 CSV serializer — quotes any field containing a comma, quote or newline. */
export function toCsv(rows: (string | number | null | undefined)[][]): string {
  const escapeCell = (cell: string | number | null | undefined): string => {
    const str = cell == null ? "" : String(cell);
    if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
    return str;
  };
  // Leading BOM so Excel opens UTF-8 accented characters correctly.
  return "﻿" + rows.map((row) => row.map(escapeCell).join(",")).join("\r\n");
}
