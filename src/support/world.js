const { setWorldConstructor, Before, After, Status } = require('@cucumber/cucumber');
const BrowserHelper = require('../utils/browserHelper');
const locator = require('../utils/locatorHelper');
const fs = require('fs');
const path = require('path');

class CustomWorld {
  constructor() {
    this.browserHelper = new BrowserHelper();
    this.page = null;
    this.context = null;
    this.locator = locator;
  }

  async init() {
    this.page = await this.browserHelper.launchBrowser();
    if (!this.page) throw new Error('BrowserHelper.launchBrowser() did not return a Page');
    this.context = this.browserHelper.getContext();
  }

  async cleanup() {
    await this.browserHelper.closeBrowser();
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  await this.init();
});

After(async function (scenario) {
  try {
    if (scenario.result?.status === Status.FAILED && this.page) {
      const screenshot = await this.page.screenshot({ fullPage: true });
      this.attach(screenshot, 'image/png');

      const screenshotsDir = process.env.SCREENSHOTS_DIR || 'screenshots';
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const scenarioName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
      const screenshotPath = path.join(screenshotsDir, `${scenarioName}_${timestamp}.png`);
      fs.writeFileSync(screenshotPath, screenshot);
      console.log(`Screenshot saved: ${screenshotPath}`);
    }
  } finally {
    await this.cleanup();
  }
});
