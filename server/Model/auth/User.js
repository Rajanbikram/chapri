import { DataTypes } from "sequelize";
import { sequelize } from "../../database/db.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("traveler", "airline_owner"), defaultValue: "traveler" },
  status: { type: DataTypes.ENUM("Active", "Blocked"), defaultValue: "Active" },  // ← NEW
});

export default User;