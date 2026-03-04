import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";
import Flight from "./flight.js";
import Seat from "./Seat.js";
import User from "../auth/User.js";

const Booking = sequelize.define("Booking", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  flightId: { type: DataTypes.INTEGER, allowNull: false },
  seatId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM("Confirmed", "Completed", "Cancelled"), defaultValue: "Confirmed" },
  totalAmount: { type: DataTypes.INTEGER, allowNull: false },
});

// Associations
Flight.hasMany(Booking, { foreignKey: "flightId" });
Booking.belongsTo(Flight, { foreignKey: "flightId" });

Seat.hasMany(Booking, { foreignKey: "seatId" });
Booking.belongsTo(Seat, { foreignKey: "seatId" });

User.hasMany(Booking, { foreignKey: "userId" });   // ← IMPORTANT
Booking.belongsTo(User, { foreignKey: "userId" }); // ← IMPORTANT

export default Booking;