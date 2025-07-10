import { findBestMatch } from "../../src/lib/find-best-match.js";

import { createFakeCreditCardType } from "./helper.test.js";

describe("findBestMatch", () => {
  it("returns nothing if there are not enough results to try to match", () => {
    expect(findBestMatch([])).toBeNull();
  });

  it("returns nothing if not every element has a matchStrength property", () => {
    expect(
      findBestMatch([
        createFakeCreditCardType({ matchStrength: 4 }),
        createFakeCreditCardType({}),
        createFakeCreditCardType({ matchStrength: 5 }),
      ]),
    ).toBeNull();
  });

  it("returns the result with the greatest matchStrength value", () => {
    const a = createFakeCreditCardType({ matchStrength: 4 });
    const b = createFakeCreditCardType({ matchStrength: 1 });
    const c = createFakeCreditCardType({ matchStrength: 40 });
    const d = createFakeCreditCardType({ matchStrength: 7 });
    const results = [a, b, c, d];

    expect(findBestMatch(results)).toBe(c);
  });
});
