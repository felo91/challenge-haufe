import { describe, it, expect } from "vitest";
import { CharacterQueryDto } from "./CharacterQueryDto";

describe("CharacterQueryDto", () => {
  it("should create URL params with page 1 (default)", async (): Promise<void> => {
    const params = CharacterQueryDto.toUrlParams({ page: 1 });
    expect(params.toString()).toBe("");
  });

  it("should create URL params with page 2", async (): Promise<void> => {
    const params = CharacterQueryDto.toUrlParams({ page: 2 });
    expect(params.toString()).toBe("page=2");
  });

  it("should create URL params with page 10", async (): Promise<void> => {
    const params = CharacterQueryDto.toUrlParams({ page: 10 });
    expect(params.toString()).toBe("page=10");
  });
});
