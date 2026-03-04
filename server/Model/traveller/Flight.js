import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

const Flight = sequelize.define("Flight", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  flightNo: { type: DataTypes.STRING, allowNull: false },
  airline: { type: DataTypes.STRING, allowNull: false },
  from: { type: DataTypes.STRING, allowNull: false },
  to: { type: DataTypes.STRING, allowNull: false },
  dep: { type: DataTypes.STRING, allowNull: false },
  arr: { type: DataTypes.STRING, allowNull: false },
  duration: { type: DataTypes.STRING },
  price: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  aircraft: { type: DataTypes.STRING, defaultValue: "Boeing 737" },  // ← NEW
  status: { type: DataTypes.ENUM("On Time", "Delayed", "Cancelled"), defaultValue: "On Time" },  // ← NEW
});

export default Flight;