import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly lastDay24hIndicator: Locator;
    readonly datePickerButton: Locator;
    readonly previous3MonthsButton: Locator;
    readonly todayButton: Locator;
    readonly yesterdayButton: Locator;
    readonly last7DaysButton: Locator;
    readonly last30DaysButton: Locator;
    readonly previousWeekButton: Locator;
    readonly previousMonthButton: Locator;
    
    constructor(page: Page) {
      this.page = page;
      this.lastDay24hIndicator = page.getByTestId('showing-last-24-h').locator('span');
      this.datePickerButton = page.getByTestId('date-picker').getByRole('img');
      this.previous3MonthsButton = page.getByRole('button', { name: 'Previous 3 Months' });
      this.todayButton = page.getByRole('button', { name: 'Today' });
      this.yesterdayButton = page.getByRole('button', { name: 'Yesterday' });
      this.last7DaysButton = page.getByRole('button', { name: 'Last 7 Days' });
      this.last30DaysButton = page.getByRole('button', { name: 'Last 30 Days' });
      this.previousWeekButton = page.getByRole('button', { name: 'Previous Week' });
      this.previousMonthButton = page.getByRole('button', { name: 'Previous Month' });
    }
    
    async verifyDashboardLoaded() {
      await expect(this.lastDay24hIndicator).toContainText('Showing Last 24h');
    }
    
    async clickDatePicker() {
      await this.datePickerButton.click();
    }
    
    async clickToday() {
      await this.todayButton.click();
    }
    
    async clickYesterday() {
      await this.yesterdayButton.click();
    }
    
    async clickLast7Days() {
      await this.last7DaysButton.click();
    }
    
    async clickLast30Days() {
      await this.last30DaysButton.click();
    }
    
    async clickPreviousWeek() {
      await this.previousWeekButton.click();
    }
    
    async clickPreviousMonth() {
      await this.previousMonthButton.click();
    }
    
    async clickPrevious3Months() {
      await this.previous3MonthsButton.click();
    }
    
    async selectToday() {
      await this.clickDatePicker();
      await this.clickToday();
    }
    
    async selectYesterday() {
      await this.clickDatePicker();
      await this.clickYesterday();
    }
    
    async selectLast7Days() {
      await this.clickDatePicker();
      await this.clickLast7Days();
    }
    
    async selectLast30Days() {
      await this.clickDatePicker();
      await this.clickLast30Days();
    }
    
    async selectPreviousWeek() {
      await this.clickDatePicker();
      await this.clickPreviousWeek();
    }
    
    async selectPreviousMonth() {
      await this.clickDatePicker();
      await this.clickPreviousMonth();
    }
    
    async selectPrevious3Months() {
      await this.clickDatePicker();
      await this.clickPrevious3Months();
    }
  }