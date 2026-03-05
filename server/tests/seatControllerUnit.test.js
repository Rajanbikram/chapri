const seatController = require("../Controller/traveller/seatController.js");
const Seat = require("../Model/traveller/Seat.js");

jest.mock("../Model/traveller/Seat.js", () => ({
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
}));

jest.mock("../Model/traveller/Flight.js", () => ({
  findByPk: jest.fn(),
}));

describe("Seat Controller", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  describe("getSeatsByFlight", () => {
    it("should return seats for a flight", async () => {
      const req = { params: { flightId: 1 } };
      const res = mockResponse();

      Seat.findAll.mockResolvedValue([
        { id: 1, flightId: 1, seatNo: "A1", isOccupied: false },
        { id: 2, flightId: 1, seatNo: "A2", isOccupied: true },
        { id: 3, flightId: 1, seatNo: "A3", isOccupied: false },
      ]);

      await seatController.getSeatsByFlight(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ seats: expect.any(Array) })
      );
    });

    it("should return empty array if no seats found", async () => {
      const req = { params: { flightId: 999 } };
      const res = mockResponse();

      Seat.findAll.mockResolvedValue([]);

      await seatController.getSeatsByFlight(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ seats: [] })
      );
    });
  });

  describe("getSeatAvailability", () => {
    it("should return seat availability stats", async () => {
      const req = { query: { flightId: 1 } };
      const res = mockResponse();

      Seat.findAll.mockResolvedValue([
        { id: 1, isOccupied: false },
        { id: 2, isOccupied: true },
        { id: 3, isOccupied: false },
      ]);

      await seatController.getSeatAvailability(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});