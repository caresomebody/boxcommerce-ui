@signup
Feature: User Sign Up to Boxcommerce Merchan Account

  Background:
    Given user navigates to "https://dashboard-uat.boxcommerce.com/en-GB/auth/sign-up"

  Scenario: Verify Sign Up Page
    When user should see "header_logo"
    And user should see "header_back"
    And user should see Have Account sections
    And user should see Create Account sections
    And user should see Sign Up Button sections
    And user should see "signup_policies_hint"
    And user clicks "signup_with_email"
    Then user should see Sign Up form

  Scenario: User failed to Sign Up when the input is not valid
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

  Scenario: User successfully sign up to Boxcommerce
    When user clicks "signup_with_email"
    And user should see Sign Up form
    Then user enters "Test" in "signup_first_name_input"
    And user enters "Automation" in "signup_last_name_input"
    And user clicks "signup_country_select"
    And user clicks "country_option_indonesia"
    And user clicks "signup_phone_country_select"
    And user enters "Indonesia" in "search_input"
    And user clicks "country_option_indonesia_phone"
    And user enters "RANDOM_PHONE" in "signup_phone_input"
    And user enters "RANDOM_EMAIL" in "signup_email_input"
    And user enters "Testing26$" in "signup_password_input"
    And user should see "signup_password_input_hidden"
    And user enters "Testing26$" in "signup_confirm_password_input"
    And user should see "signup_confirm_password_input_hidden"
    And user clicks "signup_password_visibility_toggle"
    And user should not see "signup_password_input_hidden"
    And user should see "signup_password_input_visible"
    And user clicks "signup_confirm_password_visibility_toggle"
    And user should not see "signup_confirm_password_input_hidden"
    And user should see "signup_confirm_password_input_visible"
    And user enters "UATQA-DEMO" in "signup_coupon_code_input"
    And user clicks "signup_button_enabled"
    And user should see Loading page
    And user should see Welcome to Boxcommerce Website Wizard
