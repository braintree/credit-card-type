module.exports = {
  projects: [
    {
      displayName: "CommonJS",
      preset: "ts-jest",
      testEnvironment: "node",
      testPathIgnorePatterns: ["<rootDir>/test/unit/helper.test.ts"],
      testMatch: ["**/*.test.ts"],
      transform: {
        "^.+\\.tsx?$": [
          "ts-jest",
          {
            tsconfig: "./tsconfig.cjs.json",
          },
        ],
      },
      moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
      },
      collectCoverageFrom: [
        "src/**/*.ts",
        "!src/__tests__/**/*",
        "!src/types.ts",
      ],
    },
    {
      displayName: "ESM",
      preset: "ts-jest/presets/default-esm",
      testEnvironment: "node",
      extensionsToTreatAsEsm: [".ts"],
      testPathIgnorePatterns: ["<rootDir>/test/unit/helper.test.ts"],
      testMatch: ["**/*.test.ts"],
      transform: {
        "^.+\\.tsx?$": [
          "ts-jest",
          {
            useESM: true,
            tsconfig: "./tsconfig.json",
          },
        ],
      },
      moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
      },
      collectCoverageFrom: [
        "src/**/*.ts",
        "!src/__tests__/**/*",
        "!src/types.ts",
      ],
    },
  ],
};
