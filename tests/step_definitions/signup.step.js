const { Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

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

Then(
  "user should see Welcome to Boxcommerce Website Wizard",
  async function () {
    const keys = [
      "wizard_intro_title",
      "wizard_intro_image",
      "wizard_intro_description",
      "wizard_start_button",
    ];

    for (const key of keys) {
      const el = this.locator.getLocator(this.page, key);
      await expect(el).toBeVisible({ timeout: 15000 });
    }
  }
);
