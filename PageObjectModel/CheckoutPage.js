class Checkoutpage {
  constructor(page) {
    this.page = page;
    this.cardNumber = this.page.locator("//input[@class='input txt text-validated' and @type='text']");
    this.cvv = this.page.locator("//input[@class='input txt']").nth(0);
    this.date = this.page.locator("[class='input ddl']").nth(0);
    this.month = this.page.locator("[class='input ddl']").nth(1);
    this.cxName = this.page.locator("//input[@class='input txt']").nth(1);
    this.countryName = this.page.locator("[placeholder*='Country']");
    this.placeOrderButton = this.page.locator("[class*='btnn action__']");
    this.OrdersPageButton = this.page.locator(" li [routerlink='/dashboard/myorders']");
  }

  async verifyUserName(email) {
    return await this.page.locator("label[type='text']");
  }

  async fillPaymentDetails() {
    await this.cardNumber.fill("1234 4567 7890 2121");
    await this.cvv.fill("786");
    await this.date.selectOption({ value: "07" });
    await this.month.selectOption({ value: "23" });
    await this.cxName.fill("Bheem");
  }

  async selectCountry() {
    await this.countryName.pressSequentially("Ind");
    const dropdown = await this.page.locator("[class*=ta-results ]");
    await dropdown.waitFor();
    const optionsCounnt = await dropdown.locator("button").count();
    console.log("Dropdown Count:" + optionsCounnt);

    for (let i = 0; i < optionsCounnt; i++) {
      const text = await dropdown.locator("button").nth(i).textContent();
      // console.log(text);

      if (text === " India") {
        await dropdown.locator("button").nth(i).click();
        break;
      }
    }
  }

  async PlaceOrder() {
    await this.placeOrderButton.click();
  }

  async getOrderId() {
    const completeId = await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const id = completeId.split(" ");
    return id[2];
  }

  async verifyOrderPlaced() {
    return await this.page.locator(".hero-primary");
  }

  async navigateToOrdersPage() {
    await this.OrdersPageButton.click();
    await this.page.locator("[class*='table table-bordered table-hover']").last().waitFor();
  }
}

export default Checkoutpage;
