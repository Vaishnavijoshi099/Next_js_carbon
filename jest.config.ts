import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom", // "jest-environment-jsdom" is implicit
  preset: "ts-jest", // Use ts-jest to handle TypeScript
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"], // Optional setup for global testing configs
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Handle TypeScript/JSX files
  },
  collectCoverage: true,
  collectCoverageFrom: [
   'app/Login/**/*.{js,jsx,ts,tsx}', // Include files related to LoginPage
   'app/Forms/**/*.{js,jsx,ts,tsx}', // Include files related to FormPage
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};

export default config;
