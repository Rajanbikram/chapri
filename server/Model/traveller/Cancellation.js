import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";
import Booking from "./Booking.js";

const Cancellation = sequelize.define("Cancellation", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  bookingId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Booking, key: "id" } },
  reason: { type: DataTypes.STRING, defaultValue: "User requested" },
  cancelledAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Booking.hasOne(Cancellation, { foreignKey: "bookingId" });
Cancellation.belongsTo(Booking, { foreignKey: "bookingId" });

export default Cancellation;