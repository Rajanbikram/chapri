const paymentController = require("../Controller/traveller/paymentController.js");
const Payment = require("../Model/traveller/Payment.js");
const Booking = require("../Model/traveller/Booking.js");

jest.mock("../Model/traveller/Payment.js", () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
}));

jest.mock("../Model/traveller/Booking.js", () => ({
  findByPk: jest.fn(),
  update: jest.fn(),
}));

describe("Payment Controller", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  describe("createPayment", () => {
    it("should create a payment successfully", async () => {
      const req = {
        user: { id: 1 },
        body: { bookingId: 1, method: "card", amount: 4500 },
      };
      const res = mockResponse();

      Booking.findByPk.mockResolvedValue({
        id: 1, userId: 1, status: "Confirmed",
        update: jest.fn().mockResolvedValue(true),
      });

      Payment.create.mockResolvedValue({
        id: 1, bookingId: 1, method: "card", amount: 4500, status: "Success",
      });

      await paymentController.createPayment(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: expect.any(String) })
      );
    });

    it("should return 400 if fields are missing", async () => {
      const req = { user: { id: 1 }, body: { bookingId: 1 } };
      const res = mockResponse();

      await paymentController.createPayment(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should return 404 if booking not found", async () => {
      const req = {
        user: { id: 1 },
        body: { bookingId: 999, method: "card", amount: 4500 },
      };
      const res = mockResponse();

      Booking.findByPk.mockResolvedValue(null);

      await paymentController.createPayment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});