import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForElVisibility(el: Locator): Promise<void> {
        await el.waitFor({state: 'visible'});
      }
}
