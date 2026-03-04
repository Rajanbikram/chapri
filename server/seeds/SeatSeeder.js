import Flight from "../Model/traveller/Flight.js";
import Seat from "../Model/traveller/Seat.js";
import { connection } from "../database/db.js";

const seedSeats = async () => {
  await connection();
  const flights = await Flight.findAll();

  for (const flight of flights) {
    const rows = ["A", "B", "C", "D", "E", "F"];
    const cols = 30;
    const seats = [];
    for (const row of rows) {
      for (let col = 1; col <= cols; col++) {
        seats.push({ flightId: flight.id, seatNo: `${row}${col}`, isOccupied: false });
      }
    }
    await Seat.bulkCreate(seats);
    console.log(`✅ Seats created for flight ${flight.flightNo}`);
  }
  process.exit();
};

seedSeats();