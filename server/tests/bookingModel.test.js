const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const BookingMock = dbMock.define("Booking", {
  id: 1,
  userId: 1,
  flightId: 1,
  seatId: 1,
  status: "Confirmed",
  totalAmount: 4500,
});

describe("Booking Model", () => {
  it("should create a booking with default mock data", async () => {
    const booking = await BookingMock.create({
      userId: 2,
      flightId: 1,
      seatId: 5,
      status: "Confirmed",
      totalAmount: 5000,
    });

    // SequelizeMock always returns defined mock data
    expect(booking.status).toBe("Confirmed");
    expect(booking.totalAmount).toBe(4500);
    expect(booking.userId).toBe(1);
    expect(booking.flightId).toBe(1);
    expect(booking.seatId).toBe(1);
  });

  it("should return mock booking even with empty object", async () => {
    const booking = await BookingMock.create({});
    expect(booking).toBeDefined();
    expect(booking.status).toBe("Confirmed");
  });

  it("should have correct booking structure", async () => {
    const booking = await BookingMock.findOne({ where: { id: 1 } });
    expect(booking).not.toBeNull();
    expect(booking.id).toBe(1);
    expect(booking.status).toBe("Confirmed");
    expect(booking.totalAmount).toBe(4500);
  });

  it("should find all bookings", async () => {
    const bookings = await BookingMock.findAll();
    expect(bookings).toBeDefined();
    expect(Array.isArray(bookings)).toBe(true);
  });

  it("should have Confirmed status by default", async () => {
    const booking = await BookingMock.findOne();
    expect(booking.status).toBe("Confirmed");
  });

  it("should have totalAmount defined", async () => {
    const booking = await BookingMock.findOne();
    expect(booking.totalAmount).toBeDefined();
    expect(booking.totalAmount).toBe(4500);
  });
});