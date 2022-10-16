import user from "../../models/users";

const testing = new user();

describe("Users Database testing cases", function () {
  it("should have a create method", () => {
    expect(testing.create).toBeDefined();
  });
  it("should have an index method", () => {
    expect(testing.index).toBeDefined();
  });
  it("should have a show user method", () => {
    expect(testing.getById).toBeDefined();
  });
  const newUser = {
    firstname: "Testing1",
    lastname: "User1",
    password: "Pass123",
  };
  it("should create a new user", async function () {
    const res = await testing.create(newUser);
    expect(res.id).toEqual(2);
    expect(res.firstname).toEqual("Testing1");
    expect(res.lastname).toEqual("User1");
  });
  it("should return a list of users", async function () {
    const res = await testing.index();
    expect(res[0].id).toEqual(1);
    expect(res[0].firstname).toEqual("Testing");
    expect(res[0].lastname).toEqual("User");
    expect(res[1].id).toEqual(2);
    expect(res[1].firstname).toEqual("Testing1");
    expect(res[1].lastname).toEqual("User1");
  });
  it("should return requested user", async function () {
    const res = await testing.getById(1);
    expect(res.id).toEqual(1);
    expect(res.firstname).toEqual("Testing");
    expect(res.lastname).toEqual("User");
  });
});
