import matches from "../lib/matches";

describe("matches", () => {
  describe("Array", () => {
    it("returns true if value is within range", () => {
      const range = ["123", "410"];

      expect(matches("123", range)).toBe(true);
      expect(matches("125", range)).toBe(true);
      expect(matches("309", range)).toBe(true);
      expect(matches("409", range)).toBe(true);
      expect(matches("410", range)).toBe(true);

      expect(matches("122", range)).toBe(false);
      expect(matches("010", range)).toBe(false);
      expect(matches("411", range)).toBe(false);
      expect(matches("999", range)).toBe(false);
    });

    it("returns true if value is within range for partial match", () => {
      const range = ["123", "410"];

      expect(matches("1", range)).toBe(true);
      expect(matches("12", range)).toBe(true);
      expect(matches("12", range)).toBe(true);
      expect(matches("30", range)).toBe(true);
      expect(matches("40", range)).toBe(true);
      expect(matches("41", range)).toBe(true);

      expect(matches("0", range)).toBe(false);
      expect(matches("01", range)).toBe(false);
      expect(matches("42", range)).toBe(false);
      expect(matches("99", range)).toBe(false);
      expect(matches("5", range)).toBe(false);
    });

    it("returns true if value is within range for value with more digits", () => {
      const range = ["123", "410"];

      expect(matches("1230", range)).toBe(true);
      expect(matches("1258", range)).toBe(true);
      expect(matches("309312123", range)).toBe(true);
      expect(matches("409112333", range)).toBe(true);
      expect(matches("41056789", range)).toBe(true);

      expect(matches("1220", range)).toBe(false);
      expect(matches("0100", range)).toBe(false);
      expect(matches("41134567", range)).toBe(false);
      expect(matches("99999999", range)).toBe(false);
    });
  });

  describe("Pattern", () => {
    it("returns true if value matches the pattern", () => {
      const pattern = "123";

      expect(matches("123", pattern)).toBe(true);

      expect(matches("122", pattern)).toBe(false);
      expect(matches("010", pattern)).toBe(false);
      expect(matches("411", pattern)).toBe(false);
      expect(matches("999", pattern)).toBe(false);
    });

    it("returns true if partial value matches the pattern", () => {
      const pattern = "123";

      expect(matches("", pattern)).toBe(true);
      expect(matches("1", pattern)).toBe(true);
      expect(matches("12", pattern)).toBe(true);
      expect(matches("123", pattern)).toBe(true);

      expect(matches("0", pattern)).toBe(false);
      expect(matches("01", pattern)).toBe(false);
      expect(matches("124", pattern)).toBe(false);
      expect(matches("13", pattern)).toBe(false);
    });

    it("returns true if value matches the pattern when of greater length", () => {
      const pattern = "123";

      expect(matches("1234", pattern)).toBe(true);
      expect(matches("1235", pattern)).toBe(true);
      expect(matches("1236", pattern)).toBe(true);
      expect(matches("1237123", pattern)).toBe(true);

      expect(matches("01234", pattern)).toBe(false);
    });
  });
});
