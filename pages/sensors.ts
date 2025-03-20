import { Page, Locator, expect } from '@playwright/test';

export class SensorsPage {
    readonly page: Page;
    readonly fleetsFilterButton: Locator;
    readonly vesselsFilterButton: Locator;
    readonly areaFilterButton: Locator;
    readonly compartmentFilterButton: Locator;
    readonly vesselSortButton: Locator;
    readonly locationSortButton: Locator;
    
    constructor(page: Page) {
      this.page = page;
      this.fleetsFilterButton = page.getByRole('button', { name: 'Fleets Filter' });
      this.vesselsFilterButton = page.getByRole('button', { name: 'Vessels Filter' });
      this.areaFilterButton = page.getByTestId('area');
      this.compartmentFilterButton = page.getByTestId('compartment');
      this.vesselSortButton = page.getByTestId('sensor-table-head-vessel').getByRole('button', { name: 'Vessel' });
      this.locationSortButton = page.getByRole('button', { name: 'Location' });
    }
    
    async clickFleetsFilter() {
      await this.fleetsFilterButton.click();
    }
    
    async clickVesselsFilter() {
      await this.vesselsFilterButton.click();
    }
    
    async clickAreaFilter() {
      await this.areaFilterButton.click();
    }
    
    async clickCompartmentFilter() {
      await this.compartmentFilterButton.click();
    }
    
    async clickVesselSort() {
      await this.vesselSortButton.click();
    }
    
    async clickLocationSort() {
      await this.locationSortButton.click();
    }
  }