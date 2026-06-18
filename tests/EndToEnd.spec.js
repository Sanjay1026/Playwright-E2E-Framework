import { expect, test } from "../Fixtures/pageFixtures";
import testdata from "../TestData/placeOrderTestData.json";

for (const data of testdata) {
  test(`End to End testing for -${data.productName}`, async ({
    page,
    loginPage,
    dashboardPage,
    cartPage,
    checkoutPage,
    orderPage,
  }, testInfo) => {
    const { productName, username, password } = data;
    await loginPage.launch(process.env.BASE_URL);

    const screenshot = await page.screenshot();
    await testInfo.attach("Login Screenshot", {
      body: screenshot,
      contentType: "image/png",
    });

    await loginPage.validateLogin(username, password);

    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();

    await cartPage.waitForCartPageToLoad();
    // verify product exist
    const bool = await cartPage.verifyProductName(productName);
    await expect(bool).toBeTruthy();
    await cartPage.navigateTocheckout();

    // Assertion
    const email = await checkoutPage.verifyUserName();
    await expect(email).toHaveText(username);

    await checkoutPage.fillPaymentDetails();
    await checkoutPage.selectCountry();
    await checkoutPage.PlaceOrder();

    // get the orderId
    let OriginalOrderId = await checkoutPage.getOrderId();
    console.log("OrderId is: " + OriginalOrderId);

    // Assertion
    const msg = await checkoutPage.verifyOrderPlaced();
    await expect(msg).toHaveText(" Thankyou for the order. ");
    await checkoutPage.navigateToOrdersPage();

    await orderPage.waitOrderpagoLoad();
    await orderPage.verifyOrderId(OriginalOrderId);
  });
}
