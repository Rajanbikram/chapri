import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";
import Booking from "./Booking.js";

const Payment = sequelize.define("Payment", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  bookingId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Booking, key: "id" } },
  method: { type: DataTypes.ENUM("card", "upi", "net"), allowNull: false },
  amount: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM("Success", "Failed", "Pending"), defaultValue: "Success" },
});

Booking.hasOne(Payment, { foreignKey: "bookingId" });
Payment.belongsTo(Booking, { foreignKey: "bookingId" });

export default Payment;