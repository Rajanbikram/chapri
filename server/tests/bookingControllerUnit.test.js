const bookingController = require("../Controller/traveller/bookingController.js");
const Booking = require("../Model/traveller/Booking.js");
const Seat = require("../Model/traveller/Seat.js");

jest.mock("../Model/traveller/Booking.js", () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
}));

jest.mock("../Model/traveller/Seat.js", () => ({
  findByPk: jest.fn(),
  update: jest.fn(),
}));

jest.mock("../Model/traveller/Flight.js", () => ({
  findByPk: jest.fn(),
}));

describe("Booking Controller", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  describe("createBooking", () => {
    it("should create a booking successfully", async () => {
      const req = {
        user: { id: 1 },
        body: { flightId: 1, seatId: 1, totalAmount: 4500 },
      };
      const res = mockResponse();

      Seat.findByPk.mockResolvedValue({
        id: 1, isOccupied: false,
        update: jest.fn().mockResolvedValue(true),
      });

      Booking.create.mockResolvedValue({
        id: 1, userId: 1, flightId: 1, seatId: 1,
        status: "Confirmed", totalAmount: 4500,
      });

      await bookingController.createBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: expect.any(String) })
      );
    });

    it("should return 400 if fields are missing", async () => {
      const req = { user: { id: 1 }, body: { flightId: 1 } };
      const res = mockResponse();

      await bookingController.createBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe("getMyBookings", () => {
    it("should return user bookings", async () => {
      const req = { user: { id: 1 } };
      const res = mockResponse();

      Booking.findAll.mockResolvedValue([
        { id: 1, userId: 1, flightId: 1, status: "Confirmed", totalAmount: 4500 },
        { id: 2, userId: 1, flightId: 2, status: "Confirmed", totalAmount: 3800 },
      ]);

      await bookingController.getMyBookings(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ bookings: expect.any(Array) })
      );
    });
  });

  describe("cancelBooking", () => {
    it("should cancel a booking successfully", async () => {
      const req = { user: { id: 1 }, params: { id: 1 } };
      const res = mockResponse();

      Booking.findByPk.mockResolvedValue({
        id: 1, userId: 1, status: "Confirmed", seatId: 1,
        update: jest.fn().mockResolvedValue(true),
      });

      Seat.findByPk.mockResolvedValue({
        id: 1, isOccupied: true,
        update: jest.fn().mockResolvedValue(true),
      });

      await bookingController.cancelBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: expect.any(String) })
      );
    });

    it("should return 404 if booking not found", async () => {
      const req = { user: { id: 1 }, params: { id: 999 } };
      const res = mockResponse();

      Booking.findByPk.mockResolvedValue(null);

      await bookingController.cancelBooking(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});