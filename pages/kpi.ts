import { Page, Locator, expect } from '@playwright/test';


export class KpiPage {
    readonly page: Page;
    readonly vesselFilterButton: Locator;
    readonly kpiFilterButton: Locator;
    readonly moduleHeader: Locator;
    readonly kpiNameHeader: Locator;
    readonly vesselNameHeader: Locator;
    
    constructor(page: Page) {
      this.page = page;
      this.vesselFilterButton = page.getByTestId('vessel-filter-button');
      this.kpiFilterButton = page.getByTestId('kpi-filter-button');
      this.moduleHeader = page.getByRole('button', { name: 'Module' });
      this.kpiNameHeader = page.getByTestId('kpi-config-table-header-kpi-name').getByRole('button', { name: 'KPI' });
      this.vesselNameHeader = page.getByTestId('kpi-config-table-header-vessel-name').getByRole('button', { name: 'Vessel' });
    }
    
    async clickVesselFilter() {
      await this.vesselFilterButton.click();
    }
    
    async clickKpiFilter() {
      await this.kpiFilterButton.click();
    }
    
    async clickModuleHeader() {
      await this.moduleHeader.click();
    }
    
    async clickKpiNameHeader() {
      await this.kpiNameHeader.click();
    }
    
    async clickVesselNameHeader() {
      await this.vesselNameHeader.click();
    }
    
    async filterByVessel(vesselName: string) {
      await this.clickVesselFilter();
      await this.page.getByRole('checkbox', { name: vesselName }).check();
      await this.page.getByTestId('vessel-filter-close').click();
    }
    
    async filterByKpi(kpiName: string) {
      await this.clickKpiFilter();
      await this.page.getByRole('checkbox', { name: kpiName }).check();
      await this.page.getByTestId('kpi-filter-close').click();
    }
  }