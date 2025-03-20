import { Page, Locator, expect } from '@playwright/test';

export class ActivitiesPage {
    readonly page: Page;
    readonly firstActivityRow: Locator;
    readonly showHiddenActivitiesButton: Locator;
    readonly activityStatusFilter: Locator;
    readonly addFilterButton: Locator;
    readonly clearFiltersButton: Locator;
    readonly fleetFilter: Locator;
    readonly vesselFilter: Locator;
    readonly severityFilter: Locator;
    readonly activityTypeFilter: Locator;
    readonly areaFilter: Locator;
    readonly compartmentFilter: Locator;
    readonly closeButton: Locator;
    readonly searchField: Locator;
    readonly logo: Locator;
    readonly fleetCheckBox: Locator;
    readonly vesselsCheckBox: Locator;
    readonly severityCheckBox: Locator;
    readonly activityCheckBox: Locator;
    readonly closeFilterWinButton: Locator;
    readonly starIcon: Locator;

    
    constructor(page: Page, dynamicFleet: string | null = null, dynamicVessel: string | null = null, dynamicSeveirty: string | null = null) {
      this.page = page;
      this.firstActivityRow = page.getByTestId('activity-table-row-0');
      this.showHiddenActivitiesButton = page.getByTestId('show-hidden-activities');
      this.activityStatusFilter = page.getByTestId('activity-status-filter');
      this.addFilterButton = page.getByTestId('add-filter');
      this.clearFiltersButton = page.getByTestId('clear-filters');
      this.fleetFilter = page.getByTestId('fleets-filter-button')
      this.vesselFilter = page.getByTestId('vessels-filter-button')
      this.severityFilter = page.getByTestId('severity');
      this.activityTypeFilter = page.getByTestId('activity-type');
      this.areaFilter = page.getByTestId('area');
      this.compartmentFilter = page.getByTestId('compartment');
      this.closeButton = page.getByTestId('activity-drawer-closeA');
      this.searchField = page.getByRole('textbox', { name: 'Search or Add Fleet' })
      this.logo = page.getByTestId('header-logo-link')
      this.fleetCheckBox = page.getByTestId(`fleets-checkbox-${dynamicFleet}`);
      this.vesselsCheckBox = page.getByTestId(`vessels-checkbox-${dynamicVessel}`);
      this.severityCheckBox = page.getByTestId(`vessels-checkbox-${dynamicSeveirty}`);
      this.activityCheckBox = page.getByTestId(`vessels-checkbox-${dynamicSeveirty}`);
      this.closeFilterWinButton = this.page.getByTestId('activity-status-filter-close')
      this.starIcon = this.page.getByTestId('activity-table-row-0-star')
    }
    
    async clickFirstActivity() {
      await this.firstActivityRow.click();
    }
    
    async clickShowHiddenActivities() {
      await this.showHiddenActivitiesButton.click();
    }
    
    async clickActivityStatusFilter() {
      await this.activityStatusFilter.click();
    }
    
    async clickClearFilters() {
      await this.clearFiltersButton.click();
    }
    
    async clickAddFilter() {
      await this.addFilterButton.click();
    }
    
    async clickFleetFilter() {
      await this.fleetFilter.click();
    }
    
    async clickVesselFilter() {
      await this.vesselFilter.click();
    }
    
    async clickSeverityFilter() {
      await this.severityFilter.click();
    }
    
    async clickActivityTypeFilter() {
      await this.activityTypeFilter.click();
    }
    
    async clickAreaFilter() {
      await this.areaFilter.click();
    }
    
    async clickCompartmentFilter() {
      await this.compartmentFilter.click();
    }
    
    async closeDrawer() {
      await this.closeButton.click();
    }

    async filterByFleet(fleetName: string) {
      await this.clickFleetFilter();
      await this.searchField.fill(fleetName);
      await this.fleetCheckBox.check();
      await this.logo.press('Escape');
    }
    
    async filterByVessel() {
      await this.clickVesselFilter();
      await this.vesselsCheckBox.check();
      await this.logo.press('Escape');
    }
    
    async filterBySeverity() {
      await this.clickSeverityFilter();
      await this.severityCheckBox.check();
      await this.logo.press('Escape');
    }
    
    async filterByActivityType(activityType: string) {
      await this.clickActivityTypeFilter();
      await this.activityCheckBox.check();
      await this.logo.press('Escape');
    }
    
    async filterByStarred() {
      await this.clickActivityStatusFilter();
      await this.page.getByText('Starred').click();
      await this.closeFilterWinButton.click();
    }
    
    async clickStar() { 
      await this.starIcon.click();
    }
  }
  