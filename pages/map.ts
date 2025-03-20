import { Page, Locator, expect } from '@playwright/test';

export class MapPage {
    readonly page: Page;
    readonly vesselFilterButton: Locator;
    readonly timelineRightArrow: Locator;
    readonly timelineLeftArrow: Locator;
    readonly vesselName: Locator;
    
    constructor(page: Page) {
      this.page = page;
      this.vesselFilterButton = page.getByRole('button', { name: 'Vessels Filter' });
      this.timelineRightArrow = page.getByTestId('timeline-right-arrow');
      this.timelineLeftArrow = page.getByTestId('timeline-left-arrow');
      this.vesselName = page.getByTestId('vessel-name');
    }
    
    async selectVessel(vesselName: string) {
      await this.page.getByRole('button', { name: `map-marker-${vesselName}` }).click();
      await this.vesselFilterButton.click();
    }
    
    async clickTimelineRight() {
      await this.timelineRightArrow.click();
    }
    
    async clickTimelineLeft() {
      await this.timelineLeftArrow.click();
    }
  }