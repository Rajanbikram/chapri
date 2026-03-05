const authController = require("../Controller/auth/authController.js");
const User = require("../Model/auth/User.js");

jest.mock("../Model/auth/User.js", () => ({
  create: jest.fn(),
  findOne: jest.fn(),
  findByPk: jest.fn(),
}));

jest.mock("../security/bcrypt.js", () => ({
  hashPassword: jest.fn().mockResolvedValue("hashedpassword123"),
  comparePassword: jest.fn().mockResolvedValue(true),
}));

describe("Auth Controller", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  describe("register", () => {
    it("should register a new user successfully", async () => {
      const req = {
        body: {
          name: "Arjun Patel",
          email: "arjun@email.com",
          password: "password123",
          role: "traveler",
        },
      };
      const res = mockResponse();

      User.findOne.mockResolvedValue(null);
      User.create.mockResolvedValue({
        id: 1,
        name: "Arjun Patel",
        email: "arjun@email.com",
        role: "traveler",
      });

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Account created successfully." })
      );
    });

    it("should return 400 if fields are missing", async () => {
      const req = { body: { email: "arjun@email.com" } };
      const res = mockResponse();

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "All fields are required." })
      );
    });

    it("should return 409 if email already exists", async () => {
      const req = {
        body: {
          name: "Arjun Patel",
          email: "arjun@email.com",
          password: "password123",
        },
      };
      const res = mockResponse();

      User.findOne.mockResolvedValue({ id: 1, email: "arjun@email.com" });

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Email already registered." })
      );
    });
  });

  describe("login", () => {
    it("should login successfully", async () => {
      const req = {
        body: { email: "arjun@email.com", password: "password123" },
      };
      const res = mockResponse();

      User.findOne.mockResolvedValue({
        id: 1,
        name: "Arjun Patel",
        email: "arjun@email.com",
        password: "hashedpassword123",
        role: "traveler",
      });

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "Login successful." })
      );
    });

    it("should return 400 if fields are missing", async () => {
      const req = { body: { email: "arjun@email.com" } };
      const res = mockResponse();

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should return 404 if user not found", async () => {
      const req = {
        body: { email: "wrong@email.com", password: "password123" },
      };
      const res = mockResponse();

      User.findOne.mockResolvedValue(null);

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: "User not found." })
      );
    });
  });
});