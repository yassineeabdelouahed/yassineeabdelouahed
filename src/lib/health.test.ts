import { describe, it, expect } from "vitest";
import { checkHealth } from "./health";

describe("checkHealth", () => {
  it("reports ok with a reachable database", async () => {
    const health = await checkHealth();
    expect(health.status).toBe("ok");
    expect(health.db).toBe("ok");
    expect(health.uptimeSeconds).toBeGreaterThanOrEqual(0);
    expect(() => new Date(health.timestamp).toISOString()).not.toThrow();
  });
});
