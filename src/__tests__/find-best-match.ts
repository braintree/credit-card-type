import findBestMatch from "../lib/find-best-match";

describe("findBestMatch", () => {
  it("returns nothing if there are not enough results to try to match", () => {
    expect(findBestMatch([])).toBeNull();
  });

  it("returns nothing if not every element has a matchStrength property", () => {
    expect(
      findBestMatch([{ matchStrength: 4 }, {}, { matchStrength: 5 }])
    ).toBeNull();
  });

  it("returns the result with the greatest matchStrength value", () => {
    const a = { matchStrength: 4 };
    const b = { matchStrength: 1 };
    const c = { matchStrength: 40 };
    const d = { matchStrength: 7 };
    const results = [a, b, c, d];

    expect(findBestMatch(results)).toBe(c);
  });
});
