import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";
import Flight from "../traveller/flight.js";

const FlightDelay = sequelize.define("FlightDelay", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  flightId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Flight, key: "id" } },
  reason: { type: DataTypes.STRING, defaultValue: "Operational delay" },
  delayedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Flight.hasMany(FlightDelay, { foreignKey: "flightId" });
FlightDelay.belongsTo(Flight, { foreignKey: "flightId" });

export default FlightDelay;