// commitlint.config.js
module.exports = {
  extends: ["@commitlint/config-conventional"],

  // Customize rules
  rules: {
    // Type must be one of the specified values
    "type-enum": [
      2, // Error level (0=off, 1=warn, 2=error)
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "review",
        "docs", // Documentation
        "style", // Formatting
        "refactor", // Code restructuring
        "perf", // Performance
        "test", // Tests
        "build", // Build system
        "dx", // Developer experience
        "ci", // CI configuration
        "chore", // Maintenance
        "revert", // Revert commit
      ],
    ],

    "scope-enum": [
      2,
      "always",
      [
        "american-express",
        "apple-pay",
        "client",
        "data-collector",
        "fastlane",
        "google-payment",
        "hosted-fields",
        "instant-verification",
        "local-payment",
        "payment-ready",
        "payment-request",
        "paypal-checkout",
        "paypal-checkout-v6",
        "sepa",
        "three-d-secure",
        "us-bank-account",
        "vault-manager",
        "venmo",
        "deps",
        "other",
      ],
    ],
    // Scope is optional but recommended
    "scope-empty": [1, "never"],

    // Subject configuration
    "subject-empty": [2, "never"],
    "subject-case": [0, "always", "sentence-case"],
    "subject-full-stop": [1, "never", "."],
    "subject-max-length": [2, "always", 85],

    // Body configuration
    "body-max-line-length": [2, "always", 100],

    // Footer configuration
    "footer-max-line-length": [2, "always", 100],
  },
};
