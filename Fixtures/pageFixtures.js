import { test as base } from "@playwright/test";
import LoginPage from "../PageObjectModel/LoginPage.js";
import Dashboardpage from "../PageObjectModel/DashboardPage.js";
import CartPage from "../PageObjectModel/CartPage.js";
import Checkoutpage from "../PageObjectModel/CheckoutPage.js";
import Orderpage from "../PageObjectModel/OrderPage.js";

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new Dashboardpage(page);
    await use(dashboardPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new Checkoutpage(page);
    await use(checkoutPage);
  },
  orderPage: async ({ page }, use) => {
    const orderPage = new Orderpage(page);
    await use(orderPage);
  },
});

export { expect } from "@playwright/test";
