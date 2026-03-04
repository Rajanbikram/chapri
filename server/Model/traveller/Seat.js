import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";
import Flight from "./flight.js";

const Seat = sequelize.define("Seat", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  flightId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Flight, key: "id" } },
  seatNo: { type: DataTypes.STRING, allowNull: false },
  isOccupied: { type: DataTypes.BOOLEAN, defaultValue: false },
});

Flight.hasMany(Seat, { foreignKey: "flightId" });
Seat.belongsTo(Flight, { foreignKey: "flightId" });

export default Seat;