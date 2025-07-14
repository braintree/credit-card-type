import creditCardType, {
  getTypeInfo,
  types,
  addCard,
  resetModifications,
  updateCard,
} from "../../dist/esm/index.js";

console.log("🧪 Testing ESM build...");

try {
  // Test 1: Default import works
  console.log("  Testing default import...");
  const visaResult = creditCardType("4111111111111111");
  if (!visaResult || visaResult.length === 0 || visaResult[0].type !== "visa") {
    throw new Error("Default import failed - Visa detection");
  }

  // Test 2: Named imports work
  console.log("  Testing named imports...");
  const visaInfo = getTypeInfo(types.VISA);
  if (!visaInfo || visaInfo.type !== "visa") {
    throw new Error("Named import getTypeInfo failed");
  }

  // Test 3: Named function imports work
  console.log("  Testing addCard named import...");
  addCard({
    niceType: "Test Card ESM",
    type: "test-card-esm",
    patterns: [8888],
    gaps: [4, 8, 12],
    lengths: [16],
    code: { name: "CVV", size: 3 },
  });

  const testResult = creditCardType("8888");
  if (!testResult || testResult[0].type !== "test-card-esm") {
    throw new Error("addCard named import failed");
  }

  // Test 4: resetModifications named import works
  console.log("  Testing resetModifications named import...");
  resetModifications();
  const afterReset = creditCardType("8888");
  if (afterReset.length > 0) {
    throw new Error("resetModifications named import failed");
  }

  // Test 5: updateCard named import works
  console.log("  Testing updateCard named import...");
  updateCard("visa", {
    niceType: "ESM Custom Visa",
  });
  const updatedVisa = getTypeInfo("visa");
  if (updatedVisa.niceType !== "ESM Custom Visa") {
    throw new Error("updateCard named import failed");
  }

  resetModifications();

  // Test 6: All types are available
  console.log("  Testing all card type constants...");
  const expectedTypes = [
    "VISA",
    "MASTERCARD",
    "AMERICAN_EXPRESS",
    "DINERS_CLUB",
    "DISCOVER",
    "JCB",
    "UNIONPAY",
    "MAESTRO",
    "ELO",
    "MIR",
    "HIPER",
    "HIPERCARD",
  ];

  for (const typeName of expectedTypes) {
    if (!types[typeName]) {
      throw new Error(`Missing card type constant: ${typeName}`);
    }
  }

  // Test 7: Test various card types with named imports
  console.log("  Testing card detection...");
  const testCases = [
    { number: "5555555555554444", expected: "mastercard" },
    { number: "378282246310005", expected: "american-express" },
    { number: "6011111111111117", expected: "discover" },
    { number: "30569309025904", expected: "diners-club" },
    { number: "3530111333300000", expected: "jcb" },
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

  // Test 8: Verify function properties are accessible on default import
  console.log("  Testing function properties on default import...");
  if (typeof creditCardType.getTypeInfo !== "function") {
    throw new Error("getTypeInfo not accessible on default import");
  }
  if (typeof creditCardType.addCard !== "function") {
    throw new Error("addCard not accessible on default import");
  }
  if (!creditCardType.types) {
    throw new Error("types not accessible on default import");
  }

  console.log("✅ ESM build passed all tests!");
} catch (error) {
  console.error("❌ ESM build failed:", error.message);
  process.exit(1);
}
