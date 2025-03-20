import { Page, Locator, expect } from '@playwright/test';


export class ActivityDrawer {
    readonly page: Page;
    readonly closeButton: Locator;
    readonly toDoButton: Locator;
    readonly inProgressButton: Locator;
    readonly nextActivityButton: Locator;
    readonly vesselName: Locator;
    readonly operationTypeSeverity: Locator;
    readonly title: Locator;
    readonly area: Locator;
    readonly section: Locator;
    readonly hideUnhideButton: Locator;
    
    constructor(page: Page) {
      this.page = page;
      this.closeButton = page.getByTestId('activity-drawer-closeA');
      this.toDoButton = page.getByTestId('activity-drawer-to-do');
      this.inProgressButton = page.getByTestId('activity-drawer-in-progress');
      this.nextActivityButton = page.getByTestId('next-activity');
      this.vesselName = page.getByTestId('activity-drawer-vessel-name');
      this.operationTypeSeverity = page.getByTestId('activity-drawer-operation-type-severity');
      this.title = page.getByTestId('activity-drawer-title');
      this.area = page.getByTestId('activity-area');
      this.section = page.getByTestId('activity-section');
      this.hideUnhideButton = page.getByTestId('activity-hide-unhide-button');
    }
    
    async close() {
      await this.closeButton.click();
    }
    
    async clickToDo() {
      await this.toDoButton.click();
    }
    
    async clickInProgress() {
      await this.inProgressButton.click();
    }
    
    async clickNextActivity() {
      await this.nextActivityButton.click();
    }
    
    async clickHideUnhide() {
      await this.hideUnhideButton.click();
    }
    
    async verifyVesselName(expectedName: string) {
      await expect(this.vesselName).toContainText(expectedName.toUpperCase());
    }
    
    async verifyOperationType(expectedType: string) {
      await expect(this.operationTypeSeverity).toContainText(expectedType);
    }
    
    async verifyTitle(expectedTitle: string) {
      await expect(this.title).toContainText(expectedTitle);
    }
  }