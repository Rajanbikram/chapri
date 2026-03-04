import Flight from "../../Model/traveller/flight.js";

export const updateSchedule = async (req, res) => {
  try {
    const { dep, arr } = req.body;
    const flight = await Flight.findByPk(req.params.id);
    if (!flight) return res.status(404).json({ message: "Flight not found." });

    await flight.update({ dep, arr });
    return res.status(200).json({ message: "Schedule updated successfully.", flight });
  } catch (error) {
    console.error("updateSchedule error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};