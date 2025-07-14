import { isValidInputType } from "../../src/lib/is-valid-input-type.js";

describe("isValidInputType", () => {
  it("returns true if value is a string", () => {
    expect(isValidInputType("string")).toBe(true);
  });

  it("returns true if value is a string object", () => {
    expect(isValidInputType(String("string"))).toBe(true);
  });

  it("returns false for non-string values", () => {
    expect(isValidInputType(12)).toBe(false);
    expect(isValidInputType({ foo: "bar" })).toBe(false);
    expect(isValidInputType([])).toBe(false);
    expect(isValidInputType(false)).toBe(false);
    expect(isValidInputType(true)).toBe(false);
  });
});
