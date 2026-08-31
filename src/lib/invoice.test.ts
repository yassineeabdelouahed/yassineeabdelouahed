import { describe, it, expect } from "vitest";
import { formatAmount } from "./invoice";

describe("formatAmount", () => {
  it("groups thousands with a plain ASCII space (not toLocaleString's narrow no-break space)", () => {
    expect(formatAmount(1200)).toBe("1 200");
    expect(formatAmount(1000000)).toBe("1 000 000");
  });

  it("omits decimals for whole numbers", () => {
    expect(formatAmount(42)).toBe("42");
  });

  it("keeps up to two decimals, comma-separated, for non-whole amounts", () => {
    expect(formatAmount(1000 / 1.2)).toBe("833,33");
  });

  it("rounds to two decimals", () => {
    expect(formatAmount(19.999)).toBe("20");
    expect(formatAmount(12.344)).toBe("12,34");
  });
});
