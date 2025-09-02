/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["vue", "ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.(t|j)sx?$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/app/$1",
    "^@/(.*)$": "<rootDir>/app/$1",
    "\\.(css|scss|sass|less)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup/jest.setup.js"],
  testMatch: ["<rootDir>/tests/**/*.spec.(ts|js)"],
};
