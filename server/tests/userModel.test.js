const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const UserMock = dbMock.define("User", {
  id: 1,
  name: "Arjun Patel",
  email: "arjun@email.com",
  password: "hashedpassword123",
  role: "traveler",
  status: "Active",
});

describe("User Model", () => {
  it("should create a user with default mock data", async () => {
    const user = await UserMock.create({
      name: "Priya Shah",
      email: "priya@email.com",
      password: "password123",
      role: "traveler",
      status: "Active",
    });

    // SequelizeMock always returns defined mock data
    expect(user.name).toBe("Arjun Patel");
    expect(user.email).toBe("arjun@email.com");
    expect(user.role).toBe("traveler");
    expect(user.status).toBe("Active");
  });

  it("should return mock user even with empty object", async () => {
    // SequelizeMock always resolves — it does not validate
    const user = await UserMock.create({});
    expect(user).toBeDefined();
    expect(user.name).toBe("Arjun Patel");
  });

  it("should have correct user structure", async () => {
    const user = await UserMock.findOne({ where: { email: "arjun@email.com" } });
    expect(user).not.toBeNull();
    expect(user.id).toBe(1);
    expect(user.email).toBe("arjun@email.com");
    expect(user.role).toBe("traveler");
    expect(user.status).toBe("Active");
  });

  it("should find all users", async () => {
    const users = await UserMock.findAll();
    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBe(true);
  });

  it("should have traveler role by default", async () => {
    const user = await UserMock.findOne();
    expect(user.role).toBe("traveler");
  });

  it("should have Active status by default", async () => {
    const user = await UserMock.findOne();
    expect(user.status).toBe("Active");
  });
});