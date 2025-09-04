const { Before, AfterStep, After, Status } = require('@cucumber/cucumber');
const fs = require('fs');
const path = require('path');

console.log('hooks loaded');

Before(async function () {
  await this.init();
});

AfterStep(async function ({ result, pickle }) {
  if (result?.status === Status.FAILED && this.page) {
    try {
      console.log('Taking screenshot for failed step...');
      
      // Check if page is still available before taking screenshot
      if (this.page.isClosed && this.page.isClosed()) {
        console.log('Page is already closed, skipping screenshot');
        return;
      }
      
      const screenshot = await this.page.screenshot({
        fullPage: true,
        type: 'png'
      });
      
      console.log(`Screenshot buffer size: ${screenshot.length} bytes`);
      
      // Attach to Cucumber report
      await this.attach(screenshot, 'image/png');
      console.log('Screenshot attached to Cucumber report');
      
      // Also save to file system
      const screenshotsDir = process.env.SCREENSHOTS_DIR || 'screenshots';
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }
      
      const timestamp = Date.now();
      const scenarioName = pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
      const screenshotPath = path.join(screenshotsDir, `${scenarioName}_${timestamp}.png`);
      
      fs.writeFileSync(screenshotPath, screenshot);
      console.log(`Screenshot saved to: ${screenshotPath}`);
      
    } catch (error) {
      console.error('Failed to take screenshot:', error);
      // Don't rethrow - let the test continue to cleanup
    }
  }
});

After(async function () {
  try {
    if (this.browserHelper && this.page && !this.page.isClosed()) {
      console.log('Cleaning up browser in After hook...');
      await this.cleanup();
    } else {
      console.log('Browser already closed or not available, skipping cleanup');
    }
  } catch (error) {
    console.error('Error during cleanup (non-fatal):', error.message);
  }
});