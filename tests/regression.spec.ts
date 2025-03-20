import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { DashboardPage } from '../pages/dashboard';
import { Navigation } from '../pages/navigation';
import { ActivitiesPage } from '../pages/activities';
import { ActivityDrawer } from '../pages/drawer';

// import { AdminPage } from '../pages/admin';
// import { KpiPage } from '../pages/kpi';
// import { FleetsPage } from '../pages/fleets';
// import { VesselsPage } from '../pages/vessels';
// import { MapPage } from '../pages/map';
// import { SensorsPage } from '../pages/sensors';
// import { DetectorsPage } from '../pages/detectors';

///TEST

// Temporarily here - move to external data.json file in the future
const config = {
  baseUrl: 'https://qa.prod.shipin.ai/',
  credentials: {
    username: 'gizmo@shipin.ai',
    password: 'proc_entry_t'
  },
  vessels: {
    default: 'bregaglia',
    map: 'CMA CGM MONTOIR',
    associate: 'SKY'
  },
  fleets: {
    default: 'tufton',
    associate: 'SCORPIO'
  },
  generateRandomName: (prefix: string): string => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `${prefix} ${randomNumber}`;
  }
};

// Main test suite
test.describe('Ship.in.ai Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(config.baseUrl);

    const loginPage = new LoginPage(page);
    await loginPage.clickLogin();
    await loginPage.fillUsername(config.credentials.username);
    await loginPage.fillPassword(config.credentials.password);
    await loginPage.clickSubmit();

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.verifyDashboardLoaded();
    await dashboardPage.clickDatePicker();
    await dashboardPage.clickPrevious3Months();
  });


  // Dashboard tests
  test.describe('Dashboard', () => {
    test('Date selection - predefined periods', async ({ page }) => {
      const dashboard = new DashboardPage(page);

      await dashboard.selectToday();
      await dashboard.selectYesterday();
      await dashboard.selectLast7Days();
      await dashboard.selectLast30Days();
      await dashboard.selectPreviousWeek();
      await dashboard.selectPreviousMonth();
      await dashboard.selectPrevious3Months();
    });
  });

  // Activities tests
  test.describe('Activities', () => {
    test('Filter by fleet and vessel', async ({ page }) => {
      const nav = new Navigation(page);
      const activities = new ActivitiesPage(page, config.fleets.default, config.vessels.default); //refactor 

      await nav.clickActivities();

      await activities.filterByFleet(config.fleets.default);

      await activities.clickClearFilters();

      await activities.filterByVessel();

      await activities.clickFirstActivity();

      const drawer = new ActivityDrawer(page);
      await drawer.verifyVesselName(config.vessels.default); // refactor expect instead

      await drawer.close();
    });

    test('Star activity and filter by starred', async ({ page }) => {
      const nav = new Navigation(page);
      const activities = new ActivitiesPage(page);
      const dashboard = new DashboardPage(page);

      await nav.clickActivities();

      await dashboard.selectPrevious3Months();

      await activities.clickFirstActivity();

      await activities.clickStar();

      await activities.closeDrawer();

      await activities.filterByStarred();

      await expect(activities.firstActivityRow).toBeVisible();

      await activities.clickFirstActivity();
      await activities.clickStar();
    });

  // ################ ALL TESTS IN COMMENTS SHOULD BE REFACTORED, SPLIT AND REMOVE HARDCODED ################
  //   test('Toggle hidden activities', async ({ page }) => {
  //     const nav = new Navigation(page);
  //     const activities = new ActivitiesPage(page);
  //     const drawer = new ActivityDrawer(page);

  //     await nav.clickActivities();
  //     // Verify default state
  //     await expect(activities.showHiddenActivitiesButton).toContainText('Show Hidden Activities');

  //     await activities.clickShowHiddenActivities();
  //     await activities.clickFirstActivity();
  //     await expect(drawer.hideUnhideButton).toContainText('Unhide');
  //   });
  });

  // Admin Detectors tests 
  // test.describe('Admin Detectors', () => {
  //   test('Sort detectors', async ({ page }) => { // refactor: isolate tests
  //     const admin = new AdminPage(page);
  //     const detectors = new DetectorsPage(page);

  //     await admin.clickAdmin();
  //     await admin.clickDetectors();

  //     await page.reload();
  //     await expect(detectors.firstDetectorRow).toContainText('Routine');

  //     // Sort by severity
  //     await detectors.clickSeverityHeader();
  //     await expect(page.getByTestId('detectors-table-row-0-severity')).toContainText('Alert');

  //     // Sort by activity type
  //     await detectors.clickActivityTypeHeader();
  //     await expect(page.getByTestId('detectors-table-row-0-operation')).toContainText('Bridge');

  //     // Sort by description
  //     await detectors.clickDescriptionHeader();
  //     await expect(page.getByTestId('detectors-table-row-0-title')).toContainText('Activity at Aft Mooring Station');

  //     // Sort by show/hide
  //     await detectors.clickShowHideHeader();
  //     await expect(page.getByTestId('detectors-table-row-0-vessel-policy')).toContainText('Hiding in all vessels');
  //   });

  //   test('Manage detector visibility', async ({ page }) => { // isolate test
  //     const admin = new AdminPage(page);
  //     const detectors = new DetectorsPage(page);

  //     await admin.clickAdmin();
  //     await admin.clickDetectors();

  //     await page.reload();

  //     // Verify initial state
  //     await expect(page.getByTestId('detectors-table-row-0-vessel-policy')).toContainText('Showing in some vessels');

  //     // Show in all vessels
  //     await detectors.showInAllVessels();
  //     await expect(page.getByTestId('detectors-table-row-0-vessel-policy')).toContainText('Showing in all vessels');

  //     // Hide in all vessels
  //     await detectors.hideInAllVessels();
  //     await expect(page.getByTestId('detectors-table-row-0-vessel-policy')).toContainText('Hiding in all vessels');

  //     // Show in some vessels
  //     await detectors.clickFirstDetectorMenu();
  //     await page.getByRole('menuitem', { name: 'Show in some vessels' }).click();
  //     await page.getByRole('checkbox', { name: 'ADELINA D' }).check();
  //     await page.getByTestId('submit-show-in-some-vessels').click();
  //     await expect(page.getByTestId('detectors-table-row-0-vessel-policy')).toContainText('Showing in some vessels');
  //   });
  // });

  // Admin KPI tests
  // test.describe('Admin KPI', () => {
  //   test('Filter and sort KPIs', async ({ page }) => {
  //     const admin = new AdminPage(page);
  //     const kpi = new KpiPage(page);

  //     // Navigate to admin KPI config
  //     await admin.clickAdmin();
  //     await admin.clickKpiConfig();

  //     // Filter by vessel
  //     await kpi.filterByVessel('ADELINA D');

  //     // Filter by KPI
  //     await kpi.filterByKpi('Bridge Attendance While At');

  //     // Verify filter applied
  //     await expect(page.getByTestId('kpi-config-table-row-0-kpi-name')).toContainText('Bridge Attendance While At Anchor');

  //     // Sort by module
  //     await kpi.clickModuleHeader();
  //     await kpi.clickModuleHeader(); // Toggle sort direction

  //     // Sort by KPI name
  //     await kpi.clickKpiNameHeader();

  //     // Sort by vessel name
  //     await kpi.clickVesselNameHeader();
  //   });
  // });

  // Fleet tests
  // test.describe('Fleet Management', () => {
  //   test('Create and delete fleet', async ({ page }) => {
  //     const nav = new Navigation(page);
  //     const fleets = new FleetsPage(page);

  //     // Navigate to fleets
  //     await nav.clickFleets();

  //     // Create random fleet name
  //     const fleetName = config.generateRandomName('TEST FLEET');

  //     // Create fleet
  //     await fleets.createFleet(fleetName);

  //     // Verify success message
  //     await expect(page.locator('#root')).toContainText('SuccessNew Fleet created successfully.');

  //     // Filter to see new fleet
  //     await page.getByRole('button', { name: 'Fleets Filter' }).click();
  //     await page.getByRole('textbox', { name: 'Search or Add Fleet' }).click();
  //     await page.getByRole('textbox', { name: 'Search or Add Fleet' }).fill(fleetName);

  //     // Find checkbox (transform name to lowercase with hyphens)
  //     const fleetId = fleetName.toLowerCase().replace(/\s+/g, '-');
  //     await page.getByTestId(`fleets-checkbox-${fleetId}`).check();
  //     await page.getByTestId('header-logo-link').press('Escape');

  //     // Verify fleet name
  //     await expect(page.getByTestId('fleet-table-row-0-name')).toContainText(fleetName);

  //     // Delete fleet
  //     await fleets.deleteFirstFleet(fleetName);

  //     // Verify success message
  //     await expect(page.locator('#root')).toContainText('removed successfully.');
  //   });
  // });

  // // Vessel tests
  // test.describe('Vessel Management', () => {

  //   test('Associate vessel to fleet', async ({ page }) => {
  //     const nav = new Navigation(page);
  //     const vessels = new VesselsPage(page);

  //     await nav.clickVessels();

  //     await vessels.filterByVessel(config.vessels.associate);

  //     await vessels.clickEditVessel();
  //     await vessels.unlinkVesselsFromFleet(config.fleets.associate);

  //     await vessels.associateToFleet(config.fleets.associate);

  //     await expect(page.locator('#root')).toContainText('SuccessVessel edited successfully.');
  //     await expect(page.getByTestId('vessel-table-row-0-fleet-chip')).toContainText('SCORPIO');
  //   });
  // });

  // // Map tests
  // test.describe('Map Dashboard', () => {
  //   test('Vessel info and timeline', async ({ page }) => {
  //     const map = new MapPage(page);

  //     // Select vessel on map
  //     await map.selectVessel(config.vessels.map);

  //     // Verify vessel info
  //     await expect(map.vesselName).toContainText(config.vessels.map);

  //     // Navigate timeline
  //     await map.clickTimelineRight();
  //     await map.clickTimelineLeft();
  //   });
  // });

  // // Sensors tests
  // test.describe('Sensors', () => {
  //   test('Filter and sort sensors', async ({ page }) => {
  //     const nav = new Navigation(page);
  //     const dashboard = new DashboardPage(page);
  //     const sensors = new SensorsPage(page);

  //     // Set date range
  //     await dashboard.selectPrevious3Months();

  //     // Navigate to sensors
  //     await nav.clickSensors();

  //     // Filter by fleet
  //     await sensors.clickFleetsFilter();
  //     await page.getByTestId('fleets-checkbox-TUFTON').check();
  //     await page.locator('div:nth-child(8) > div').first().click();

  //     // Filter by vessel
  //     await sensors.clickVesselsFilter();
  //     await page.getByTestId('vessels-checkbox-GLEN COVE').check();
  //     await page.locator('div:nth-child(8) > div').first().click();

  //     // Filter by area
  //     await sensors.clickAreaFilter();
  //     await page.getByTestId('area-checkbox-Engine Room').check();
  //     await page.locator('div:nth-child(8) > div').first().click();

  //     // Filter by compartment
  //     await sensors.clickCompartmentFilter();
  //     await page.getByTestId('compartment-checkbox-Generator').check();

  //     // Verify filters applied
  //     await expect(page.getByTestId('sensor-table-row-0-vessel').locator('span')).toContainText('GLEN COVE');
  //     await expect(page.getByTestId('sensor-table-row-0-area')).toContainText('Engine Room');
  //     await expect(page.getByTestId('sensor-table-row-0-compartment')).toContainText('Generator');

  //     // Sort by vessel
  //     await sensors.clickVesselSort();
  //     await sensors.clickVesselSort(); // Toggle direction

  //     // Sort by location
  //     await sensors.clickLocationSort();
  //   });
  // });

 
});