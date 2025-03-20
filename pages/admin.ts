import { Page, Locator, expect } from '@playwright/test';

export class AdminPage {
    readonly page: Page;
    readonly adminLink: Locator;
    readonly adminDetectorsLink: Locator;
    readonly adminKpiConfigLink: Locator;
    readonly adminUsersLink: Locator;
    
    constructor(page: Page) {
      this.page = page;
      this.adminLink = page.getByTestId('admin');
      this.adminDetectorsLink = page.getByTestId('admin-detectors');
      this.adminKpiConfigLink = page.getByTestId('admin-kpi-configuration');
      this.adminUsersLink = page.getByTestId('admin-users');
    }
    
    async clickAdmin() {
      await this.adminLink.click();
    }
    
    async clickDetectors() {
      await this.adminDetectorsLink.click();
    }
    
    async clickKpiConfig() {
      await this.adminKpiConfigLink.click();
    }
    
    async clickUsers() {
      await this.adminUsersLink.click();
    }
  }