import { Page, Locator, expect } from '@playwright/test';

export class DetectorsPage {
    readonly page: Page;
    readonly firstDetectorRow: Locator;
    readonly severityHeader: Locator;
    readonly activityTypeHeader: Locator;
    readonly descriptionHeader: Locator;
    readonly showHideHeader: Locator;
    readonly firstDetectorMenu: Locator;
    readonly showVesselsOption: Locator;
    readonly hideVesselsOption: Locator;
    readonly showAllButton: Locator;
    readonly hideAllButton: Locator;
    
    constructor(page: Page) {
      this.page = page;
      this.firstDetectorRow = page.getByTestId('detectors-table-row-0-severity');
      this.severityHeader = page.getByTestId('detector-table-header-severity');
      this.activityTypeHeader = page.getByTestId('detector-table-header-activitytype');
      this.descriptionHeader = page.getByTestId('detector-table-header-description');
      this.showHideHeader = page.getByTestId('detector-table-header-showhide');
      this.firstDetectorMenu = page.getByTestId('detector-table-row-menu-0');
      this.showVesselsOption = page.getByTestId('menu-show-vessels-0');
      this.hideVesselsOption = page.getByTestId('menu-hide-vessels-0');
      this.showAllButton = page.getByTestId('submit-show-all');
      this.hideAllButton = page.getByTestId('submit-hide-all');
    }
    
    async clickSeverityHeader() {
      await this.severityHeader.click();
    }
    
    async clickActivityTypeHeader() {
      await this.activityTypeHeader.click();
    }
    
    async clickDescriptionHeader() {
      await this.descriptionHeader.click();
    }
    
    async clickShowHideHeader() {
      await this.showHideHeader.click();
    }
    
    async clickFirstDetectorMenu() {
      await this.firstDetectorMenu.click();
    }
    
    async clickShowVesselsOption() {
      await this.showVesselsOption.click();
    }
    
    async clickHideVesselsOption() {
      await this.hideVesselsOption.click();
    }
    
    async clickShowAllButton() {
      await this.showAllButton.click();
    }
    
    async clickHideAllButton() {
      await this.hideAllButton.click();
    }
    
    async showInAllVessels() {
      await this.clickFirstDetectorMenu();
      await this.clickShowVesselsOption();
      await this.clickShowAllButton();
    }
    
    async hideInAllVessels() {
      await this.clickFirstDetectorMenu();
      await this.clickHideVesselsOption();
      await this.clickHideAllButton();
    }
  }
  