module.exports = {
  default: {
    paths: ["tests/features/**/*.feature"],

    require: ["tests/step_definitions/**/*.js", "src/support/**/*.js"],
    format: [
      "progress",
      "json:reports/cucumber-report.json",
      "html:reports/cucumber-report.html",
    ],
    formatOptions: { snippetInterface: "async-await" },
    dryRun: false,
    failFast: false,
    parallel: 2,
    headless: true,
  },
};
