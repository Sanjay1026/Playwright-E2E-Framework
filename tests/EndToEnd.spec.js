import { expect, test } from "@playwright/test";
import LoginPage from "../PageObjectModel/LoginPage";
import Dashboardpage from "../PageObjectModel/DashboardPage";
import CartPage from "../PageObjectModel/CartPage";
import Checkoutpage from "../PageObjectModel/CheckoutPage";
import Orderpage from "../PageObjectModel/OrderPage";
import testdata from "../TestData/placeOrderTestData.json";

test("End to End testing", async ({ page }) => {
  const productName = testdata.productName;
  const username = testdata.username;
  const password = testdata.password;

  const login = new LoginPage(page);
  await login.launch(testdata.url);
  await login.validateLogin(username, password);

  const dashboard = new Dashboardpage(page);
  await dashboard.searchProductAddCart(productName);
  await dashboard.navigateToCart();

  const cart = new CartPage(page);
  await cart.waitForCartPageToLoad();
  // verify product exist
  const bool = await cart.verifyProductName(productName);
  await expect(bool).toBeTruthy();
  await cart.navigateTocheckout();

  const checkOut = new Checkoutpage(page);
  // Assertion
  const email = await checkOut.verifyUserName();
  await expect(email).toHaveText(username);

  await checkOut.fillPaymentDetails();
  await checkOut.selectCountry();
  await checkOut.PlaceOrder();

  // get the orderId
  let OriginalOrderId = await checkOut.getOrderId();
  console.log("OrderId is: " + OriginalOrderId);

  // Assertion
  const msg = await checkOut.verifyOrderPlaced();
  await expect(msg).toHaveText(" Thankyou for the order. ");

  await checkOut.navigateToOrdersPage();

  const orders = new Orderpage(page);

  await orders.waitOrderpageToLoad();
  await orders.verifyOrderId(OriginalOrderId);
});
