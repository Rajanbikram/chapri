import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";
import Flight from "./flight.js";
import Seat from "./Seat.js";

const Booking = sequelize.define("Booking", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  flightId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Flight, key: "id" } },
  seatId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Seat, key: "id" } },
  status: { type: DataTypes.ENUM("Confirmed", "Completed", "Cancelled"), defaultValue: "Confirmed" },
  totalAmount: { type: DataTypes.INTEGER, allowNull: false },
});

Flight.hasMany(Booking, { foreignKey: "flightId" });
Booking.belongsTo(Flight, { foreignKey: "flightId" });
Seat.hasMany(Booking, { foreignKey: "seatId" });
Booking.belongsTo(Seat, { foreignKey: "seatId" });

export default Booking;