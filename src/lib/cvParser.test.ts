import { describe, it, expect } from "vitest";
import PDFDocument from "pdfkit";
import { extractCvSuggestions } from "./cvParser";

function buildPdf(text: string): Promise<Buffer> {
  const doc = new PDFDocument();
  const chunks: Buffer[] = [];
  doc.on("data", (chunk) => chunks.push(chunk));
  const done = new Promise<Buffer>((resolve) => doc.on("end", () => resolve(Buffer.concat(chunks))));
  doc.text(text);
  doc.end();
  return done;
}

describe("extractCvSuggestions", () => {
  it("returns an empty result for non-PDF mime types", async () => {
    const result = await extractCvSuggestions(Buffer.from("hello"), "text/plain");
    expect(result).toEqual({ skills: [], experienceYears: null });
  });

  it("returns an empty result (never throws) for a malformed PDF buffer", async () => {
    const result = await extractCvSuggestions(Buffer.from("not a pdf"), "application/pdf");
    expect(result).toEqual({ skills: [], experienceYears: null });
  });

  it("extracts known skill keywords and years of experience from real PDF text", async () => {
    const pdf = await buildPdf(
      "Amine Bennani — Développeur Full-Stack\n" +
        "5 ans d'experience en developpement web.\n" +
        "Competences : JavaScript, TypeScript, React, Node.js, PostgreSQL, Docker.",
    );
    const result = await extractCvSuggestions(pdf, "application/pdf");
    expect(result.experienceYears).toBe(5);
    expect(result.skills).toEqual(
      expect.arrayContaining(["JavaScript", "TypeScript", "React", "Node.js", "PostgreSQL", "Docker"]),
    );
  });

  it("does not match a skill keyword that only appears as a substring of another word", async () => {
    const pdf = await buildPdf("Je maitrise Golang et Ruby on Rails.");
    const result = await extractCvSuggestions(pdf, "application/pdf");
    // "Go" is a keyword; "Golang" must not trigger a false-positive match on "Go".
    expect(result.skills).not.toContain("Go");
    expect(result.skills).toContain("Ruby");
  });
});
