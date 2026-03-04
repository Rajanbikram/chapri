import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "chapri",     // ✅ database name
  "postgres",           // username
  "Rajanbikram@123",    // password
  {
    host: "localhost",
    dialect: "postgres",
    logging: true
  }
);

export const connection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // ← TEMPORARILY

    console.log("Connection has been established successfully.");

    await sequelize.sync();
    console.log("All tables synced successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
