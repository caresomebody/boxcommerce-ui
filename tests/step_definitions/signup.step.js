const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { generateRandomPhone} = require("../../src/support/dataGenerator");


Then("user should see Create Account sections", async function () {
  const keys = [
    "section_create_account_title",
    "section_create_account_subtitle",
  ];

  for (const key of keys) {
    const el = this.locator.getLocator(this.page, key);
    await expect(el).toBeVisible({ timeout: 15000 });
  }
});

Then("user should see Sign Up Button sections", async function () {
  const keys = [
    "signup_with_email",
    "signup_with_facebook",
    "signup_with_google",
    "signup_with_x",
  ];

  for (const key of keys) {
    const el = this.locator.getLocator(this.page, key);
    await expect(el).toBeVisible({ timeout: 15000 });
  }
});

Then("user should see Have Account sections", async function () {
  const keys = [
    "section_signed_up_title",
    "section_signed_up_info",
    "section_signed_up_login_button",
  ];

  for (const key of keys) {
    const el = this.locator.getLocator(this.page, key);
    await expect(el).toBeVisible({ timeout: 15000 });
  }
});

Then("user should see Sign Up form", async function () {
  const keys = [
    "signup_first_name_input",
    "signup_last_name_input",
    "signup_country_select",
    "signup_phone_country_select",
    "signup_phone_input",
    "signup_email_input",
    "signup_password_input",
    "signup_password_visibility_toggle",
    "signup_confirm_password_input",
    "signup_confirm_password_visibility_toggle",
    "signup_coupon_code_input",
    "signup_coupon_field_disabled",
  ];

  for (const key of keys) {
    const el = this.locator.getLocator(this.page, key);
    await expect(el).toBeVisible({ timeout: 15000 });
  }
});

Then("user should see Loading page", async function () {
  const keys = ["loader_message", "loader_tip", "loader_spinner"];

  for (const key of keys) {
    const el = this.locator.getLocator(this.page, key);
    await expect(el).toBeVisible({ timeout: 15000 });
  }
});

Given("user choose Indonesia location", async function () {
  this.locator.getLocator(this.page, "signup_country_select").click();
  this.locator.getLocator(this.page, "country_option_indonesia").click();
});

When("user fills phone number with Indonesia code", async function () {
  const select = this.locator.getLocator(this.page, "signup_phone_country_select");
  const search = this.locator.getLocator(this.page, "search_input");
  const option = this.locator.getLocator(this.page, "country_option_indonesia_phone");
  const phoneInput = this.locator.getLocator(this.page, "signup_phone_input");

  await expect(select).toBeVisible({ timeout: 15000 });
  await expect(select).toBeEnabled({ timeout: 15000 });
  await this.page.waitForTimeout(300);
  await select.click();
  
  await expect(search).toBeVisible({ timeout: 15000 });
  await search.fill("Indonesia");
  await expect(option).toBeVisible({ timeout: 15000 });
  await option.click();
  const randomPhone = generateRandomPhone();
  await expect(phoneInput).toBeVisible({ timeout: 15000 });
  await phoneInput.fill(randomPhone);

  console.log(`Generated phone: ${randomPhone}`);
});

When("user fills password and confirm password with {string}", async function (password) {
  // Fill password
  const passInput = this.locator.getLocator(this.page, "signup_password_input");
  await expect(passInput).toBeVisible({ timeout: 15000 });
  await passInput.fill(password);

  // Should see hidden input
  const passHidden = this.locator.getLocator(this.page, "signup_password_input_hidden");
  await expect(passHidden).toBeVisible({ timeout: 15000 });

  // Fill confirm password
  const confirmInput = this.locator.getLocator(this.page, "signup_confirm_password_input");
  await expect(confirmInput).toBeVisible({ timeout: 15000 });
  await confirmInput.fill(password);

  // Should see hidden confirm input
  const confirmHidden = this.locator.getLocator(this.page, "signup_confirm_password_input_hidden");
  await expect(confirmHidden).toBeVisible({ timeout: 15000 });

  // Toggle password visibility
  const passToggle = this.locator.getLocator(this.page, "signup_password_visibility_toggle");
  await expect(passToggle).toBeVisible({ timeout: 15000 });
  await passToggle.click();
  await expect(passHidden).not.toBeVisible({ timeout: 15000 });

  const passVisible = this.locator.getLocator(this.page, "signup_password_input_visible");
  await expect(passVisible).toBeVisible({ timeout: 15000 });

  // Toggle confirm password visibility
  const confirmToggle = this.locator.getLocator(this.page, "signup_confirm_password_visibility_toggle");
  await expect(confirmToggle).toBeVisible({ timeout: 15000 });
  await confirmToggle.click();
  await expect(confirmHidden).not.toBeVisible({ timeout: 15000 });

  const confirmVisible = this.locator.getLocator(this.page, "signup_confirm_password_input_visible");
  await expect(confirmVisible).toBeVisible({ timeout: 15000 });
});

When("user enters coupon code {string} and handles validation", async function (coupon) {
  const couponInput = this.locator.getLocator(this.page, "signup_coupon_code_input");
  const signupButton = this.locator.getLocator(this.page, "signup_button_enabled");
  
  // First attempt - enter coupon code
  await expect(couponInput).toBeVisible({ timeout: 15000 });
  await couponInput.fill(coupon);
  
  await expect(signupButton).toBeVisible({ timeout: 15000 });
  await signupButton.click();
  
  // Wait a moment for any error message to appear
  await this.page.waitForTimeout(2000);
  
  // Check if error message appears
  const errorMessage = this.page.locator('div.text-warn:has-text("CouponCode")');
  
  try {
    // Wait for error message with short timeout
    await expect(errorMessage).toBeVisible({ timeout: 3000 });
    console.log("Coupon code error detected, clearing input and retrying...");
    
    // Clear the coupon input
    await couponInput.clear();
    
    // Wait a moment after clearing
    await this.page.waitForTimeout(1000);
    
    // Click signup button again
    await expect(signupButton).toBeVisible({ timeout: 15000 });
    await signupButton.click();
    
  } catch (error) {
    console.log("No coupon code error detected, continue the process");
  }
});