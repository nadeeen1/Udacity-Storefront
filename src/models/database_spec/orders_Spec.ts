import order from "../../models/orders";
import product from "../../models/products";
import user from "../../models/users";
const testing = new order();
const testingu = new user();

describe("Orders Database testing cases", function () {
  it("should have a create method", () => {
    expect(testing.createOrder).toBeDefined();
  });
  it("should have a show order method", () => {
    expect(testing.showOrder).toBeDefined();
  });
  it("should have a show completed orders method", () => {
    expect(testing.showOrder).toBeDefined();
  });
  it("should have method to add products to an order", () => {
    expect(testing.addProduct).toBeDefined();
  });
  beforeAll(async function () {
    const user = {
      firstname: "Testing",
      lastname: "User",
      password: "Pass123",
    };
    await testingu.create(user);
  });
  const newOrder = {
    user_id: 1,
    status: "active",
  };
  const newOrder1 = {
    user_id: 1,
    status: "complete",
  };
  it("should create a new active order", async function () {
    const res = await testing.createOrder(newOrder);
    expect(res).toEqual({
      order_id: 1,
      user_id: 1,
      status: "active",
    });
  });
  it("should create a new complete order", async function () {
    const res = await testing.createOrder(newOrder1);
    expect(res).toEqual({
      order_id: 2,
      user_id: 1,
      status: "complete",
    });
  });
  it("should display the current order", async function () {
    const res = await testing.showOrder(1);
    expect(res).toEqual({
      order_id: 2,
      user_id: 1,
      status: "complete",
    });
  });
  it("should display the completed orders", async function () {
    const res = await testing.showCompletedOrders(1);
    expect(res[0]).toEqual({
      order_id: 2,
      user_id: 1,
      status: "complete",
    });
  });
  const testProduct = new product();
  const productT = {
    name: "Product1",
    price: 100,
  };
  async function create() {
    await testProduct.create(productT);
  }
  create();
  const op = {
    quantity: 100,
    order_id: 1,
    product_id: 1,
  };
  it("adds a product to an existing order", async function () {
    const res = await testing.addProduct(op);
    expect(res).toEqual({
      id: 1,
      quantity: 100,
      order_id: 1,
      product_id: 1,
    });
  });
});
