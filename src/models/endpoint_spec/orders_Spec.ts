import supertest from "supertest";
const bodyParser = require("body-parser");
import app from "../../index";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const request = supertest(app);

describe("Orders endpoint testing", function () {
  let token: string;
  beforeAll(async function () {
    const user = {
      firstname: "Testing2",
      lastname: "User2",
      password: "Pass123",
    };
    const res = await request.post("/users/create").send(user);
    token = res.body.token;
    const product = {
      name: "Product3",
      price: 20,
    };
    await request
      .post("/products/create")
      .set("Authorization", "Bearer " + token)
      .send(product);
  });
  it("creates a new order", async function () {
    const order = {
      user_id: 1,
      status: "active",
    };
    const res = await request
      .post("/orders/create")
      .set("Authorization", "Bearer " + token)
      .send(order);
    expect(res.body.order_id).toEqual(3);
    expect(res.body.user_id).toEqual(1);
    expect(res.body.status).toEqual("active");
    expect(res.status).toEqual(200);
  });

  it("returns complete customer orders", async function () {
    const user = {
      id: 1,
    };
    const res = await request
      .get("/orders/complete")
      .set("Authorization", "Bearer " + token)
      .send(user);

    expect(res.body[0].order_id).toEqual(2);
  });

  it("doesnt return complete orders without token", async function () {
    const user = {
      id: 1,
    };
    const res = await request.get("/orders/complete").send(user);
    expect(res.status).toEqual(401);
  });

  it("doesnt return complete orders for non existent user", async function () {
    const user = {
      id: 6,
    };
    const res = await request
      .get("/orders/complete")
      .set("Authorization", "Bearer " + token)
      .send(user);
    expect(res.status).toEqual(400);
  });

  it("returns current user order", async function () {
    const user = {
      id: 1,
    };
    const res = await request
      .get("/orders/current")
      .set("Authorization", "Bearer " + token)
      .send(user);
    expect(res.status).toEqual(200);
    expect(res.body.order_id).toEqual(3);
    expect(res.body.user_id).toEqual(1);
    expect(res.body.status).toEqual("active");
  });

  it("adds a product to the order", async function () {
    const product = {
      quantity: 20,
      order_id: 1,
      product_id: 2,
    };
    const res = await request
      .post("/orders/1/products")
      .set("Authorization", "Bearer " + token)
      .send(product);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      id: 2,
      quantity: 20,
      order_id: 1,
      product_id: 2,
    });
  });
});
