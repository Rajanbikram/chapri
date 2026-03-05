const ownerUserController = require("../Controller/owner/ownerUserController.js");
const User = require("../Model/auth/User.js");

jest.mock("../Model/auth/User.js", () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
}));

describe("Owner User Controller", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it("should return all traveler users", async () => {
    const req = {};
    const res = mockResponse();

    User.findAll.mockResolvedValue([
      { id: 1, name: "Arjun Patel", email: "arjun@email.com", role: "traveler", status: "Active" },
      { id: 2, name: "Priya Shah", email: "priya@email.com", role: "traveler", status: "Active" },
    ]);

    await ownerUserController.getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ users: expect.any(Array) })
    );
  });

  it("should block a user successfully", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    User.findByPk.mockResolvedValue({
      id: 1, name: "Arjun Patel", status: "Active",
      update: jest.fn().mockResolvedValue(true),
    });

    await ownerUserController.blockUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringContaining("blocked") })
    );
  });

  it("should return 404 if user not found for block", async () => {
    const req = { params: { id: 999 } };
    const res = mockResponse();
    User.findByPk.mockResolvedValue(null);

    await ownerUserController.blockUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("should unblock a user successfully", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    User.findByPk.mockResolvedValue({
      id: 1, name: "Arjun Patel", status: "Blocked",
      update: jest.fn().mockResolvedValue(true),
    });

    await ownerUserController.unblockUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringContaining("unblocked") })
    );
  });

  it("should return 404 if user not found for unblock", async () => {
    const req = { params: { id: 999 } };
    const res = mockResponse();
    User.findByPk.mockResolvedValue(null);

    await ownerUserController.unblockUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});