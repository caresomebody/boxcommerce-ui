@signup
Feature: User Sign Up to Boxcommerce Merchan Account

  Background:
    Given user navigates to "https://dashboard-uat.boxcommerce.com/en-GB/auth/sign-up"

  @Verify @TC01
  Scenario: TC-01 - Verify Sign Up Page
    When user should see "header_logo"
    And user should see "header_back"
    And user should see Have Account sections
    And user should see Create Account sections
    And user should see Sign Up Button sections
    And user should see "signup_policies_hint"
    And user clicks "signup_with_email"
    Then user should see Sign Up form

  @Validation @TC02
  Scenario: TC-02 - User failed to Sign Up when the input is not valid
    When user clicks "signup_with_email"
    And user should see Sign Up form
    Then user enters "Test" in "signup_first_name_input"
    And user enters "Automation" in "signup_last_name_input"
    And user enters "55" in "signup_phone_input"
    And user enters "5" in "signup_email_input"
    And user enters "T5" in "signup_password_input"
    And user enters "26$" in "signup_confirm_password_input"
    And user enters "UATQA-DEMO" in "signup_coupon_code_input"
    And user clears "signup_first_name_input"
    And user clears "signup_last_name_input"
    And user clicks "signup_email_input"
    And user clicks "signup_phone_input"
    And user clicks "signup_first_name_input"
    And user clicks "signup_last_name_input"
    And user should see "error_confirm_password_mismatch"
    And user should see "error_password_requirements"
    And user should see "error_invalid_email"
    And user should see "error_invalid_phone"
    And user should see "error_first_name_required"
    And user should see "error_last_name_required"
    And user should see "signup_button_disabled"

  @Create @TC03
  Scenario: TC-03 - User successfully sign up to Boxcommerce & Create Store
    When user clicks "signup_with_email"
    And user should see Sign Up form
    Then user enters "Test" in "signup_first_name_input"
    And user enters "Automation" in "signup_last_name_input"
    And user choose Indonesia location
    And user fills phone number with Indonesia code
    And user enters "RANDOM_EMAIL" in "signup_email_input"
    And user fills password and confirm password with "Testing26$"
    And user enters coupon code "UATQA-DEMO" and handles validation
    And user should see Loading page
    And user should see Welcome to Boxcommerce Website Wizard
    And user clicks "wizard_start_button"
    And user should see Step 1 of Website Wizard
    And user fills Store Name, URL, Description, and Whatsapp as empty and invalid, and check error message
    And user uploads image "../../src/image/logo.png" to "wizard_logo_file_input"
    And user click save in Crop Image
    And user fills all field in Step 1
    And user waits 2 seconds
    And user clicks "wizard_next_step"
    And user should see Step 2 of Website Wizard
    And user search and select store location
    And user waits 2 seconds
    And user clicks "wizard_next_step"
    And user waits 2 seconds
    And user should see Quick Guide and continue
    And user should see Success Built Store message and finish the Onboarding
    And user should see "dashboard_header_title"
