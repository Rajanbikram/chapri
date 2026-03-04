import Flight from "../../Model/traveller/flight.js";
import { Op } from "sequelize";

export const searchFlights = async (req, res) => {
  try {
    const { from, to, date } = req.query;
    const where = {};
    if (from) where.from = { [Op.iLike]: `%${from}%` };
    if (to) where.to = { [Op.iLike]: `%${to}%` };
    if (date) where.date = date;

    const flights = await Flight.findAll({ where });
    return res.status(200).json({ flights });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findByPk(req.params.id);
    if (!flight) return res.status(404).json({ message: "Flight not found." });
    return res.status(200).json({ flight });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};