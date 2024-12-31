module.exports = {
    testEnvironment: "jsdom", // Required for testing React components
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Transforms JavaScript and JSX using Babel
    },
    transformIgnorePatterns: [
      "/node_modules/(?!(axios)/)", // Ensures axios and other ES Modules are transformed
    ],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mocks CSS imports
    },
  };
  