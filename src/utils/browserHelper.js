const { chromium, firefox, webkit } = require('@playwright/test');

class BrowserHelper {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  async launchBrowser(browserType = 'chromium', options = {}) {
    const asBool = v => String(v).toLowerCase() === 'true';
    const defaultOptions = {
      headless: asBool(process.env.HEADLESS),
      viewport: { width: 1280, height: 720 },
      ...options
    };

    switch (browserType.toLowerCase()) {
      case 'firefox':
        this.browser = await firefox.launch(defaultOptions);
        break;
      case 'webkit':
      case 'safari':
        this.browser = await webkit.launch(defaultOptions);
        break;
      default:
        this.browser = await chromium.launch(defaultOptions);
    }

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    
    return this.page;
  }

  async closeBrowser() {
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }

  getPage() {
    return this.page;
  }

  getContext() {
    return this.context;
  }

  getBrowser() {
    return this.browser;
  }
}

module.exports = BrowserHelper;