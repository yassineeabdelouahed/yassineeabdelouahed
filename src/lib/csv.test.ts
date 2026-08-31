import { describe, it, expect } from "vitest";
import { toCsv } from "./csv";

describe("toCsv", () => {
  it("joins rows and cells with CRLF/comma and prefixes a UTF-8 BOM", () => {
    const csv = toCsv([
      ["Nom", "Ville"],
      ["Amine", "Casablanca"],
    ]);
    expect(csv.startsWith("﻿")).toBe(true);
    expect(csv).toBe("﻿Nom,Ville\r\nAmine,Casablanca");
  });

  it("quotes and escapes cells containing commas, quotes or newlines", () => {
    const csv = toCsv([["a, b", 'she said "hi"', "line1\nline2"]]);
    expect(csv).toBe('﻿"a, b","she said ""hi""","line1\nline2"');
  });

  it("renders null and undefined cells as empty strings", () => {
    const csv = toCsv([["x", null, undefined]]);
    expect(csv).toBe("﻿x,,");
  });

  it("stringifies numeric cells without quoting", () => {
    const csv = toCsv([[42, 3.5]]);
    expect(csv).toBe("﻿42,3.5");
  });
});
