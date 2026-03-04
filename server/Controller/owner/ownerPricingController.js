import Flight from "../../Model/traveller/flight.js";

export const updatePrice = async (req, res) => {
  try {
    const { price } = req.body;
    const flight = await Flight.findByPk(req.params.id);
    if (!flight) return res.status(404).json({ message: "Flight not found." });

    await flight.update({ price });
    return res.status(200).json({ message: "Price updated successfully.", flight });
  } catch (error) {
    console.error("updatePrice error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};