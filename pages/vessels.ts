import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base';

export class VesselsPage extends (BasePage) {
    readonly page: Page;
    readonly vesselFilterButton: Locator;
    firstVesselRow: Locator;
    firstVesseleEditButton: Locator;
    
    constructor(page: Page) {
      super(page);
      this.page = page;
      this.vesselFilterButton = page.getByRole('button', { name: 'Vessels Filter' });
      this.firstVesselRow = this.page.getByTestId('vessel-table-row-0').last() // change when there will be only 1 unique
      this.firstVesseleEditButton = this.page.getByTestId('vessel-table-row-0-actions')
    }
    
    async clickVesselFilter() {
      await this.vesselFilterButton.click();
    }
    
    async filterByVessel(vesselName: string) {
      await this.clickVesselFilter();
      await this.page.getByRole('textbox', { name: 'Search or Add Fleet' }).click();
      await this.page.getByRole('textbox', { name: 'Search or Add Fleet' }).fill(vesselName);
      await this.page.getByTestId(`vessels-checkbox-${vesselName}`.toLocaleLowerCase()).check();
      await this.page.getByTestId('header-logo-link').press('Escape');
    }
    
    async clickEditVessel() {
      await this.waitForElVisibility(this.firstVesselRow);
      await this.firstVesselRow.hover();
      await this.firstVesseleEditButton.click();
      await this.page.getByTestId('edit-vessel').click();
    }

    async unlinkVesselsFromFleet(vesselName: string): Promise<void>{
      try {
       await this.page.getByTestId(`transfer-row-${vesselName}`).uncheck()
      }
      catch(err){
        throw new Error(`no associated vessel or :${err}`)
      }
    }
    
    async associateToFleet(fleetName: string) {
      await this.page.getByRole('textbox', {name: "Search Fleets…"}).first().waitFor({state: 'attached'});
      await this.page.getByRole('textbox', {name: "Search Fleets…"}).first().fill(fleetName);
      await this.page.getByTestId(`transfer-checkbox-${fleetName}`).getByRole('checkbox').check();
      await this.page.getByTestId('edit-vessel-button').click();
    }
  }