const ownerFlightController = require("../Controller/owner/ownerFlightController.js");
const Flight = require("../Model/traveller/flight.js");

jest.mock("../Model/traveller/Flight.js", () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
}));

jest.mock("../Model/traveller/Seat.js", () => ({
  findAll: jest.fn(),
  update: jest.fn(),
}));

describe("Owner Flight Controller", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it("should return all flights", async () => {
    const req = {};
    const res = mockResponse();

    Flight.findAll.mockResolvedValue([
      {
        id: 1, flightNo: "VY-101", airline: "Vayu Airways",
        from: "Delhi", to: "Mumbai", dep: "06:00", arr: "08:15",
        price: 4500, status: "On Time",
        Seats: [{ id: 1, isOccupied: true }, { id: 2, isOccupied: false }],
      },
    ]);

    await ownerFlightController.getAllFlights(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ flights: expect.any(Array) })
    );
  });

  it("should add a new flight successfully", async () => {
    const req = {
      body: {
        flightNo: "VY-999", aircraft: "Boeing 737",
        from: "Delhi", to: "Chennai", dep: "10:00", arr: "13:00",
      },
    };
    const res = mockResponse();

    Flight.create.mockResolvedValue({
      id: 3, flightNo: "VY-999", from: "Delhi", to: "Chennai",
      dep: "10:00", arr: "13:00", status: "On Time",
    });

    await ownerFlightController.addFlight(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Flight added successfully." })
    );
  });

  it("should return 400 if required fields are missing", async () => {
    const req = { body: { flightNo: "VY-999" } };
    const res = mockResponse();

    await ownerFlightController.addFlight(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "All fields are required." })
    );
  });
});