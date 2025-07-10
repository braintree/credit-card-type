const creditCardType = require("../../dist/cjs/index.js");

console.log("🧪 Testing CommonJS build...");

try {
  // Test 1: Default export works
  console.log("  Testing default export...");
  const visaResult = creditCardType("4111111111111111");
  if (!visaResult || visaResult.length === 0 || visaResult[0].type !== "visa") {
    throw new Error("Default export failed - Visa detection");
  }

  // Test 2: Methods attached to function work
  console.log("  Testing getTypeInfo method...");
  const visaInfo = creditCardType.getTypeInfo("visa");
  if (!visaInfo || visaInfo.type !== "visa") {
    throw new Error("getTypeInfo method failed");
  }

  // Test 3: Types constant works
  console.log("  Testing types constant...");
  if (!creditCardType.types || creditCardType.types.VISA !== "visa") {
    throw new Error("types constant failed");
  }

  // Test 4: Can destructure named exports from require
  console.log("  Testing destructured imports...");
  const { getTypeInfo, types } = require("../../dist/cjs/index.js");
  const mastercardInfo = getTypeInfo(types.MASTERCARD);
  if (!mastercardInfo || mastercardInfo.type !== "mastercard") {
    throw new Error("Destructured named exports failed");
  }

  // Test 5: Card modification methods work
  console.log("  Testing addCard method...");
  creditCardType.addCard({
    niceType: "Test Card",
    type: "test-card",
    patterns: [9999],
    gaps: [4, 8, 12],
    lengths: [16],
    code: { name: "CVV", size: 3 },
  });

  const testResult = creditCardType("9999");
  if (!testResult || testResult[0].type !== "test-card") {
    throw new Error("addCard method failed");
  }

  // Test 6: resetModifications works
  console.log("  Testing resetModifications...");
  creditCardType.resetModifications();
  const afterReset = creditCardType("9999");
  if (afterReset.length > 0) {
    throw new Error("resetModifications failed - custom card still exists");
  }

  // Test 7: updateCard works
  console.log("  Testing updateCard method...");
  creditCardType.updateCard("visa", {
    niceType: "Custom Visa",
  });
  const updatedVisa = creditCardType.getTypeInfo("visa");
  if (updatedVisa.niceType !== "Custom Visa") {
    throw new Error("updateCard method failed");
  }

  // Reset after test
  creditCardType.resetModifications();

  // Test 8: Test various card types
  console.log("  Testing various card types...");
  const testCases = [
    { number: "5555555555554444", expected: "mastercard" },
    { number: "378282246310005", expected: "american-express" },
    { number: "6011111111111117", expected: "discover" },
    { number: "30569309025904", expected: "diners-club" },
  ];

  for (const testCase of testCases) {
    const result = creditCardType(testCase.number);
    if (
      !result ||
      result.length === 0 ||
      result[0].type !== testCase.expected
    ) {
      throw new Error(`Card detection failed for ${testCase.expected}`);
    }
  }

  console.log("✅ CommonJS build passed all tests!");
} catch (error) {
  console.error("❌ CommonJS build failed:", error.message);
  process.exit(1);
}
