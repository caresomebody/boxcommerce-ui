const { setWorldConstructor } = require('@cucumber/cucumber');
const BrowserHelper = require('../utils/browserHelper');
const locator = require('../utils/locatorHelper');

class CustomWorld {
  constructor(options) {
    Object.assign(this, options);
    
    this.browserHelper = new BrowserHelper();
    this.page = null;
    this.context = null;
    this.locator = locator;
  }

  async init() {
    console.log('Initializing browser...');
    this.page = await this.browserHelper.launchBrowser();
    if (!this.page) {
      throw new Error('BrowserHelper.launchBrowser() did not return a Page');
    }
    this.context = this.browserHelper.getContext();
    console.log('Browser initialized successfully');
  }

  async cleanup() {
    console.log('Cleaning up browser...');
    if (this.browserHelper) {
      await this.browserHelper.closeBrowser();
    }
    console.log('Browser cleanup completed');
  }
}

setWorldConstructor(CustomWorld);