// scripts.ts
export default {
  scripts: {
    test:
      "deno test --coverage=docs/reports/coverage --unstable --allow-read --allow-write",
    coverage:
      "deno coverage docs/reports/coverage/ --lcov > docs/reports/coverage/lcov.info",
  },
};
