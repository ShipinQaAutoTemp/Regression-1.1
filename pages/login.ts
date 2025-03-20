import { Page, Locator, expect } from '@playwright/test';

// Login Page
export class LoginPage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.getByRole('link', { name: 'Log In' });
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.submitButton = page.getByRole('button', { name: 'submit' });
  }
  
  async goto(url: string) {
    await this.page.goto(url);
  }
  
  async clickLogin() {
    await this.loginLink.click();
  }
  
  async fillUsername(username: string) {
    await this.usernameInput.click();
    await this.usernameInput.fill(username);
  }
  
  async fillPassword(password: string) {
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
  }
  
  async clickSubmit() {
    await this.submitButton.click();
  }
  
  async login(url: string, username: string, password: string) {
    await this.goto(url);
    await this.clickLogin();
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSubmit();
  }
}