import { Page, Locator } from '@playwright/test';

export class Navigation {
    readonly page: Page;
    readonly activitiesLink: Locator;
    readonly dashboardLink: Locator;
    readonly sensorsLink: Locator;
    readonly fleetsLink: Locator;
    readonly vesselsLink: Locator;
    readonly adminLink: Locator;
    
    constructor(page: Page) {
      this.page = page;
      this.activitiesLink = page.getByRole('link', { name: 'Activities' });
      this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
      this.sensorsLink = page.getByRole('link', { name: 'Sensors' });
      this.fleetsLink = page.getByRole('link', { name: 'Fleets' });
      this.vesselsLink = page.getByRole('link', { name: 'Vessels' });
      this.adminLink = page.getByTestId('admin');
    }
    
    async clickActivities() {
      await this.activitiesLink.click();
    }
    
    async clickDashboard() {
      await this.dashboardLink.click();
    }
    
    async clickSensors() {
      await this.sensorsLink.click();
    }
    
    async clickFleets() {
      await this.fleetsLink.click();
    }
    
    async clickVessels() {
      await this.vesselsLink.click();
    }
    
    async clickAdmin() {
      await this.adminLink.click();
    }
  }