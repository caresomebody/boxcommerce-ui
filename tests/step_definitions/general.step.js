const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const {
  generateRandomPhone,
  generateRandomEmail,
} = require("../../src/support/dataGenerator");

Given("user navigates to {string}", async function (url) {
  await this.page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
});

Given("user clicks {string}", async function (element) {
  const elementLocator = this.locator.getLocator(this.page, element);
  await expect(elementLocator).toBeVisible({ timeout: 15000 });
  await expect(elementLocator).toBeEnabled({ timeout: 15000 });

  const elements = await elementLocator.all();
  if (elements.length > 1) {
    console.warn(
      `Found ${elements.length} elements matching "${element}". Clicking the first visible one.`
    );
  }

  for (const elem of elements) {
    if (await elem.isVisible()) {
      await elem.click();
      break;
    }
  }
});

Then("user should see {string}", async function (element) {
  const elementLocator = this.locator.getLocator(this.page, element);
  await expect(elementLocator).toBeVisible({ timeout: 15000 });
});

Then("user should not see {string}", async function (element) {
  const elementLocator = this.locator.getLocator(this.page, element);
  await expect(elementLocator).not.toBeVisible({ timeout: 15000 });
});

Then(
  "Element {string} should contain text {string}",
  async function (element, expectedText) {
    const elementLocator = this.locator.getLocator(this.page, element);
    await expect(elementLocator).toContainText(expectedText, {
      timeout: 15000,
    });
  }
);

Then(
  "Element {string} should have text {string}",
  async function (element, expectedText) {
    const elementLocator = this.locator.getLocator(this.page, element);
    await expect(elementLocator).toHaveText(expectedText, { timeout: 15000 });
  }
);

Then(
  "Element {string} should have value {string}",
  async function (element, expectedValue) {
    const elementLocator = this.locator.getLocator(this.page, element);
    await expect(elementLocator).toHaveValue(expectedValue, { timeout: 20000 });
  }
);

When("user waits for {string} to be visible", async function (element) {
  const elementLocator = this.locator.getLocator(this.page, element);
  await expect(elementLocator).toBeVisible({ timeout: 15000 });
});

When("user waits for {string} to be hidden", async function (element) {
  const elementLocator = this.locator.getLocator(this.page, element);
  await expect(elementLocator).toBeHidden({ timeout: 15000 });
});

When("user waits {int} seconds", async function (seconds) {
  await this.page.waitForTimeout(seconds * 1000);
});

When(
  "user selects {string} from {string}",
  async function (optionText, element) {
    const elementLocator = this.locator.getLocator(this.page, element);
    await expect(elementLocator).toBeVisible({ timeout: 15000 });
    await elementLocator.selectOption({ label: optionText });
  }
);

When(
  "user selects option with value {string} from {string}",
  async function (optionValue, element) {
    const elementLocator = this.locator.getLocator(this.page, element);
    await expect(elementLocator).toBeVisible({ timeout: 15000 });
    await elementLocator.selectOption({ value: optionValue });
  }
);

When("user enters {string} in {string}", async function (text, element) {
  let value = text;

  switch (text.toUpperCase()) {
    case "RANDOM_PHONE":
      value = generateRandomPhone();
      break;
    case "RANDOM_EMAIL":
      value = generateRandomEmail();
      break;
    default:
      break;
  }
  console.log(`Filling ${element} with value: ${value}`);

  const elementLocator = this.locator.getLocator(this.page, element);
  await expect(elementLocator).toBeVisible({ timeout: 15000 });
  await elementLocator.fill(value);
});

When("user clears {string}", async function (element) {
  const elementLocator = this.locator.getLocator(this.page, element);
  await expect(elementLocator).toBeVisible({ timeout: 15000 });
  await elementLocator.fill("");
});
