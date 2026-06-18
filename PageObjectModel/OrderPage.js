class Orderpage {
  constructor(page) {
    this.page = page;
    this.rows = page.locator("tbody tr");
  }

  async waitOrderpageToLoad() {
    return await this.page.locator("h1:has-text('Your Orders')");
  }

  async verifyOrderId(orderId) {
    const rowCount = await this.rows.count();
    // console.log("No of rows: " + rowCount);    // optional

    for (let i = 0; i < rowCount; i++) {
      const rowOrderId = await this.rows.nth(i).locator("th").textContent();
      console.log("OrderId After Verifying " + rowOrderId);

      if (rowOrderId === orderId) {
        //   console.log(rowOrderId);
        console.log("Orderd Found");
        // to click on view
        await this.rows.nth(i).locator("button").first().click();
        break;
      } else {
        console.log("Order not found");
      }
    }
  }
}

export default Orderpage;
