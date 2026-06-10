class LoginPage {
  constructor(page) {
    this.page = page;
    this.EmailTextField = page.locator("#userEmail");
    this.PasswordTextField = page.locator("#userPassword");
    this.LoginButton = page.locator("[value='Login']");
  }

  async launch(url) {
    await this.page.goto(url);
  }

  async validateLogin(username, password) {
    await this.EmailTextField.fill(username);
    await this.PasswordTextField.fill(password);
    await this.LoginButton.click();
    await this.page.locator(".card-body b").last().waitFor();
  }
}

export default LoginPage;
