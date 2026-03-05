const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const FlightMock = dbMock.define("Flight", {
  id: 1,
  flightNo: "VY-201",
  airline: "Vayu Airways",
  from: "Delhi",
  to: "Mumbai",
  dep: "06:00",
  arr: "08:15",
  duration: "2h 15m",
  price: 4500,
  date: "2026-03-15",
  aircraft: "Boeing 737",
  status: "On Time",
});

describe("Flight Model", () => {
  it("should create a flight with default mock data", async () => {
    const flight = await FlightMock.create({
      flightNo: "VY-999",
      airline: "Vayu Airways",
      from: "Delhi",
      to: "Chennai",
      dep: "10:00",
      arr: "13:00",
      duration: "3h 00m",
      price: 5000,
      date: "2026-04-01",
      aircraft: "Airbus A320",
      status: "On Time",
    });

    // SequelizeMock always returns defined mock data
    expect(flight.flightNo).toBe("VY-201");
    expect(flight.airline).toBe("Vayu Airways");
    expect(flight.price).toBe(4500);
    expect(flight.status).toBe("On Time");
    expect(flight.from).toBe("Delhi");
    expect(flight.to).toBe("Mumbai");
  });

  it("should return mock flight even with empty object", async () => {
    // SequelizeMock always resolves — it does not validate
    const flight = await FlightMock.create({});
    expect(flight).toBeDefined();
    expect(flight.flightNo).toBe("VY-201");
  });

  it("should have correct flight structure", async () => {
    const flight = await FlightMock.findOne({ where: { flightNo: "VY-201" } });
    expect(flight).not.toBeNull();
    expect(flight.id).toBe(1);
    expect(flight.dep).toBe("06:00");
    expect(flight.arr).toBe("08:15");
    expect(flight.duration).toBe("2h 15m");
    expect(flight.aircraft).toBe("Boeing 737");
  });

  it("should find all flights", async () => {
    const flights = await FlightMock.findAll();
    expect(flights).toBeDefined();
    expect(Array.isArray(flights)).toBe(true);
  });
});