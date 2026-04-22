module.exports = {
  types: [
    { value: "feat", name: "feat:     A new feature" },
    { value: "fix", name: "fix:      A bug fix" },
    {
      value: "review",
      name: "review:   Commits added during the review process",
    },
    { value: "docs", name: "docs:     Documentation only changes" },
    {
      value: "style",
      name: "style:    Changes that do not affect the meaning of the code (formatting, semicolons)",
    },
    {
      value: "refactor",
      name: "refactor: A code change that neither fixes a bug nor adds a feature",
    },
    {
      value: "perf",
      name: "perf:     A code change that improves performance",
    },
    {
      value: "test",
      name: "test:     Adding missing tests or correcting existing tests",
    },
    { value: "build", name: "build:    Build system changes" },
    {
      value: "dx",
      name: "dx:       Changes that affect the development cycle",
    },
    { value: "ci", name: "ci:       CI configuration changes" },
    {
      value: "chore",
      name: "chore:    Other maintenance, including dependency updates",
    },
    { value: "revert", name: "revert:   Revert a commit" },
  ],

  scopes: [
    { name: "american-express" },
    { name: "apple-pay" },
    { name: "client" },
    { name: "data-collector" },
    { name: "fastlane" },
    { name: "google-payment" },
    { name: "hosted-fields" },
    { name: "instant-verification" },
    { name: "local-payment" },
    { name: "payment-ready" },
    { name: "payment-request" },
    { name: "paypal-checkout" },
    { name: "paypal-checkout-v6" },
    { name: "sepa" },
    { name: "three-d-secure" },
    { name: "us-bank-account" },
    { name: "vault-manager" },
    { name: "venmo" },
    { name: "deps" },
    { name: "other" },
  ],

  // When type is "review", skip the scope prompt entirely
  scopeOverrides: {
    review: [],
  },

  // Skip questions you don't need
  skipQuestions: ["footer"],

  // Limit subject length
  subjectLimit: 85,
};
