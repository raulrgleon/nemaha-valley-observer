import { describe, expect, it } from "vitest";
import { readingTime, cn } from "../src/lib/utils";
import { articleSchema } from "../src/lib/validation";

describe("utils", () => {
  it("estimates reading time", () => {
    expect(readingTime(440)).toBe(2);
  });

  it("merges class names", () => {
    expect(cn("a", false && "b", "c")).toContain("a");
  });
});

describe("validation", () => {
  it("accepts a valid article payload", () => {
    const parsed = articleSchema.safeParse({
      title: "Auburn Community Center Announces Summer Program Schedule",
      dek: "Registration opens next week for youth camps and family evenings.",
      slug: "auburn-community-center-summer-program-schedule",
      category: "community",
      locality: "Auburn",
      body: "<p>This is a sufficiently long body for validation purposes in tests.</p>",
      tags: ["Auburn"],
      featured: true,
      status: "DRAFT",
      subscriberOnly: false,
    });
    expect(parsed.success).toBe(true);
  });
});
