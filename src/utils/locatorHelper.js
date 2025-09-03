const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

class LocatorHelper {
  constructor() {
    this.locators = {};
    this.loadLocators();
  }

  loadLocators() {
    try {
      // Load all YAML files from locators directory
      const locatorsDir = path.join(__dirname, '../locators');
      const files = fs.readdirSync(locatorsDir);
      
      files.forEach(file => {
        if (file.endsWith('.yaml') || file.endsWith('.yml')) {
          const filePath = path.join(locatorsDir, file);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const locatorData = yaml.load(fileContents);
          
          // Merge all locator files
          this.locators = { ...this.locators, ...locatorData };
        }
      });
    } catch (error) {
      console.error('Error loading locators:', error);
    }
  }

  getLocator(page, elementKey) {
    const locatorValue = this.locators[elementKey];
    
    if (!locatorValue) {
      throw new Error(`Locator not found for element: ${elementKey}`);
    }

    // Determine locator type based on the pattern
    if (locatorValue.startsWith('//') || locatorValue.startsWith('(//')) {
      // XPath locator
      return page.locator(`xpath=${locatorValue}`);
    } else if (locatorValue.startsWith('#')) {
      // ID locator
      return page.locator(locatorValue);
    } else if (locatorValue.startsWith('.')) {
      // Class locator
      return page.locator(locatorValue);
    } else if (locatorValue.includes('=')) {
      // Data attribute or other attribute locator
      return page.locator(`[${locatorValue}]`);
    } else if (locatorValue.includes('[') && locatorValue.includes(']')) {
      // CSS selector with attributes
      return page.locator(locatorValue);
    } else {
      // Default to CSS selector
      return page.locator(locatorValue);
    }
  }

  getAllLocators() {
    return this.locators;
  }

  hasLocator(elementKey) {
    return elementKey in this.locators;
  }
}

module.exports = new LocatorHelper();