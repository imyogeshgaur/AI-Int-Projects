import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  roots: ["<rootDir>/src/test"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
};

export default config;