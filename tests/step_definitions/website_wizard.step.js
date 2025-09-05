const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const {
  generateRandomPhone,
  generateRandomStoreName,
  generateRandomUsername,
  generateRandomString,
} = require("../../src/support/dataGenerator");

Then(
  "user should see Welcome to Boxcommerce Website Wizard",
  async function () {
    const keys = [
      "wizard_intro_title",
      "wizard_intro_image",
      "wizard_intro_description",
      "wizard_start_button",
      "wizard_step1_label",
      "wizard_step1_tooltip",
      "wizard_step2_label",
      "wizard_step2_tooltip",
      "wizard_exit_button",
      "wizard_header_logo",
      "wizard_helping_hand_title",
      "wizard_helping_hand_link",
    ];

    for (const key of keys) {
      const el = this.locator.getLocator(this.page, key);
      await expect(el).toBeVisible({ timeout: 15000 });
    }
  }
);

Then("user should see Step 1 of Website Wizard", async function () {
  const keys = [
    "wizard_active_step1",
    "wizard_section_header",
    "wizard_section_tip",
    "wizard_store_name_label",
    "wizard_store_name_description",
    "wizard_store_name_input",
    "wizard_store_url_label",
    "wizard_store_url_label",
    "wizard_store_url_description",
    "wizard_store_url_input",
    "wizard_store_url_suffix",
    "wizard_store_url_available",
    "wizard_about_label",
    "wizard_about_desc",
    "wizard_about_editor_root",
    "wizard_about_editor_editable",
    "wizard_about_editor_placeholder",
    "wizard_about_toolbar_bold",
    "wizard_about_toolbar_italic",
    "wizard_about_toolbar_underline",
    "wizard_about_toolbar_ol",
    "wizard_about_toolbar_ul",
    "wizard_about_toolbar_link",
    "wizard_about_toolbar_clear",
    "wizard_logo_label",
    "wizard_logo_description",
    "wizard_logo_upload_zone",
    "wizard_logo_upload_message",
    "wizard_logo_upload_browse",
    "wizard_logo_upload_tip",
    "social_links_label",
    "social_links_desc",
    "social_facebook_field",
    "social_facebook_prefix",
    "social_facebook_input",
    "social_instagram_field",
    "social_instagram_prefix",
    "social_instagram_input",
    "social_whatsapp_field",
    "social_whatsapp_tel_input",
  ];

  for (const key of keys) {
    const el = this.locator.getLocator(this.page, key);
    await expect(el).toBeVisible({ timeout: 15000 });
  }
});

When(
  "user fills Store Name, URL, Description, and Whatsapp as empty and invalid, and check error message",
  async function () {
    const nameStore = this.locator.getLocator(
      this.page,
      "wizard_store_name_input"
    );
    const urlStore = this.locator.getLocator(
      this.page,
      "wizard_store_url_input"
    );
    const descStore = this.locator.getLocator(
      this.page,
      "wizard_about_editor_editable"
    );
    const waStore = this.locator.getLocator(
      this.page,
      "social_whatsapp_tel_input"
    );

    await nameStore.fill("");
    await urlStore.fill("");
    await descStore.fill("");
    await waStore.fill("11");
    await nameStore.click();

    const keys = [
      "wizard_error_name_required",
      "wizard_error_url_required",
      "wizard_error_content_required",
      "whatsapp_error_invalid",
    ];

    for (const key of keys) {
      const el = this.locator.getLocator(this.page, key);
      await expect(el).toBeVisible({ timeout: 15000 });
    }
  }
);

When("user click save in Crop Image", async function () {
  const keys = [
    "crop_image_title",
    "crop_image_close",
    "crop_image_rotate_left",
    "crop_image_rotate_right",
    "crop_image_zoom_in",
    "crop_image_zoom_out",
    "crop_image_source",
    "crop_image_message",
    "crop_image_cancel",
    "crop_image_save",
  ];

  for (const key of keys) {
    const el = this.locator.getLocator(this.page, key);
    await expect(el).toBeVisible({ timeout: 15000 });
  }

  const cropImageSave = this.locator.getLocator(this.page, "crop_image_save");
  await cropImageSave.click();
});

When("user fills all field in Step 1", async function () {
  const nameStore = this.locator.getLocator(
    this.page,
    "wizard_store_name_input"
  );
  const descStore = this.locator.getLocator(
    this.page,
    "wizard_about_editor_editable"
  );
  const waStore = this.locator.getLocator(
    this.page,
    "social_whatsapp_tel_input"
  );
  const fbStore = this.locator.getLocator(this.page, "social_facebook_input");
  const igStore = this.locator.getLocator(this.page, "social_instagram_input");
  const randomPhone = generateRandomPhone();
  const randomStore = generateRandomStoreName();
  const randomUsername = generateRandomUsername();
  const randomString = generateRandomString();
  await nameStore.fill(randomStore);
  await descStore.fill(randomString);
  await waStore.fill(randomPhone);
  await fbStore.fill(randomUsername);
  await igStore.fill(randomUsername);

  console.log(`Generated phone: ${randomPhone}`);
  console.log(`Generated store: ${randomStore}`);
  console.log(`Generated username: ${randomUsername}`);
  console.log(`Generated string: ${randomString}`);
});

Then("user should see Step 2 of Website Wizard", async function () {
  const keys = [
    "wizard_active_step2",
    "wizard_prev_step",
    "delivery_address_header",
    "delivery_address_description",
    "delivery_address_map",
    "delivery_address_find_label",
    "delivery_address_find_desc",
    "delivery_address_search_input",
    "address_building_label",
    "address_building_desc",
    "address_building_input",
    "address_line1_label",
    "address_line1_desc",
    "address_line1_input",
    "address_line2_label",
    "address_line2_desc",
    "address_line2_input",
    "address_suburb_label",
    "address_suburb_desc",
    "address_suburb_input",
    "address_city_label",
    "address_city_desc",
    "address_city_input",
    "address_province_label",
    "address_province_desc",
    "address_province_input",
    "address_postal_label",
    "address_postal_desc",
    "address_postal_input",
    "address_country_label",
    "address_country_desc",
    "address_country_input",
    "address_latitude_label",
    "address_latitude_desc",
    "address_latitude_input",
    "address_longitude_label",
    "address_longitude_desc",
    "address_longitude_input",
  ];

  for (const key of keys) {
    const el = this.locator.getLocator(this.page, key);
    await expect(el).toBeVisible({ timeout: 15000 });
  }
});

When("user search and select store location", async function () {
  const addressSearch = this.locator.getLocator(
    this.page,
    "delivery_address_search_input"
  );
  await addressSearch.fill("Living World Kota Wisata");
  await addressSearch.press('Enter');
  await this.page.waitForTimeout(3 * 1000);

  const optionLW = this.locator.getLocator(
    this.page,
    "address_option_living_world"
  );
  await expect(optionLW).toBeVisible({ timeout: 15000 });
  await optionLW.click();
});

Then("user should see Quick Guide and continue", async function () {
  const keys = [
    "tour_list_item_quick_guide_label",
    "tour_list_item_quick_guide_tick",
    "tour_footer_title",
    "tour_next_button",
    "tour_slide_1",
  ];

  for (const key of keys) {
    const el = this.locator.getLocator(this.page, key);
    await expect(el).toBeVisible({ timeout: 15000 });
  }

  const tourNext = this.locator.getLocator(this.page, "tour_next_button");
  const tourSlide2 = this.locator.getLocator(this.page, "tour_slide_2");
  const tourSlide3 = this.locator.getLocator(this.page, "tour_slide_3");
  await tourNext.click();
  await expect(tourSlide2).toBeVisible({ timeout: 15000 });
  await tourNext.click();
  await expect(tourSlide3).toBeVisible({ timeout: 15000 });
  await tourNext.click();
});

Then(
  "user should see Success Built Store message and finish the Onboarding",
  async function () {
    const keys = [
      "onboarding_done_image",
      "onboarding_done_title",
      "onboarding_done_description",
      "onboarding_done_button",
    ];

    for (const key of keys) {
      const el = this.locator.getLocator(this.page, key);
      await expect(el).toBeVisible({ timeout: 15000 });
    }

    const doneBtn = this.locator.getLocator(
      this.page,
      "onboarding_done_button"
    );
    await doneBtn.click();
  }
);
