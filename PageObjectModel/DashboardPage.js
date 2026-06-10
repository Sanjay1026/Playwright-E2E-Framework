class Dashboardpage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.ProductTitles = page.locator("[class='card-body']");
    this.cart = page.locator("[routerLink*='cart']");
  }

  async searchProductAddCart(productName) {
    // const titles = this.ProductTitles.textContent();
    // console.log(titles);

    let count = await this.products.count();
    for (let i = 0; i < count; i++) {
      if ((await this.products.nth(i).locator("b").textContent()) === productName) {
        //   console.log(await products.nth(i).locator("b").textContent());

        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }
  async navigateToCart() {
    await this.cart.click();
  }
}

export default Dashboardpage;
