import product from "../../models/products";

const testing = new product();

describe("Products Database testing cases", function () {
  it("should have a create method", () => {
    expect(testing.create).toBeDefined();
  });
  it("should have an index method", () => {
    expect(testing.index).toBeDefined();
  });
  it("should have a show user method", () => {
    expect(testing.show).toBeDefined();
  });
  const newProduct = {
    name: "Product2",
    price: 50,
  };
  it("should create a new product", async function () {
    const res = await testing.create(newProduct);
    expect(res.id).toEqual(2);
    expect(res.product_name).toEqual("Product2");
    expect(res.price).toEqual(50);
  });
  it("should return a list of products", async function () {
    const res = await testing.index();
    expect(res[0].id).toEqual(1);
    expect(res[0].product_name).toEqual("Product1");
    expect(res[0].price).toEqual(100);
    expect(res[1].id).toEqual(2);
    expect(res[1].product_name).toEqual("Product2");
    expect(res[1].price).toEqual(50);
  });
  it("should return requested Product", async function () {
    const res = await testing.show(1);
    expect(res.id).toEqual(1);
    expect(res.product_name).toEqual("Product1");
    expect(res.price).toEqual(100);
  });
});
