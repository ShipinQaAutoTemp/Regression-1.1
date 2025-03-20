import { Page, Locator, expect } from '@playwright/test';


export class FleetsPage {
    readonly page: Page;
    readonly adminMenuButton: Locator;
    readonly fleetNameInput: Locator;
    readonly saveButton: Locator;
    readonly selectVesselsButton: Locator;
    
    constructor(page: Page) {
      this.page = page;
      this.adminMenuButton = page.getByTestId('fleet-admin-menu-button');
      this.fleetNameInput = page.locator('#fleetNameInput');
      this.saveButton = page.getByRole('button', { name: 'Save' });
      this.selectVesselsButton = page.getByRole('button', { name: 'Select Vessels...' });
    }
    
    async clickAdminMenu() {
      await this.adminMenuButton.click();
    }
    
    async fillFleetName(name: string) {
      await this.fleetNameInput.click();
      await this.fleetNameInput.fill(name);
    }
    
    async clickSave() {
      await this.saveButton.click();
    }
    
    async clickSelectVessels() {
      await this.selectVesselsButton.click();
    }
    
    async createFleet(fleetName: string) {
      await this.clickAdminMenu();
      await this.fillFleetName(fleetName);
      await this.clickSave();
    }
    
    async deleteFirstFleet(fleetName: string) { // change by dynamic index
      await this.page.locator('.MuiTableBody-root tr').first().hover();
      await this.page.getByTestId('fleet-table-row-0-actions').click();
      await this.page.getByTestId('remove-fleet').click();
      await this.page.getByRole('textbox', { name: 'Re-Enter Fleet Name' }).fill(fleetName);
      await this.page.getByTestId('remove-fleet-button').click();
    }
  }
  