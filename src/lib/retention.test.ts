import { describe, it, expect } from "vitest";
import { RETENTION_RULES } from "./retention";

describe("RETENTION_RULES", () => {
  it("documents one rule per data type purged, each with a label, retention period and action", () => {
    expect(RETENTION_RULES.length).toBeGreaterThan(0);
    for (const rule of RETENTION_RULES) {
      expect(rule.key).toBeTruthy();
      expect(rule.label).toBeTruthy();
      expect(rule.retention).toBeTruthy();
      expect(rule.action).toBeTruthy();
    }
  });

  it("has unique rule keys", () => {
    const keys = RETENTION_RULES.map((r) => r.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});
