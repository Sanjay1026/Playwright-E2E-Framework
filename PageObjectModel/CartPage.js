class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator("div ul li button");
    this.cartProducts = page.locator("div ul");
  }

  async waitForCartPageToLoad() {
    await this.cartProducts.last().waitFor();
  }

  async verifyProductName(productName) {
    return await this.page.locator(`h3:has-text('${productName}')`).isVisible();
  }

  async navigateTocheckout() {
    await this.checkoutButton.nth(2).click();
  }
}

export default CartPage;
