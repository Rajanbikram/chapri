import User from "../../Model/auth/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      where: { role: "traveler" },
    });
    return res.status(200).json({ users });
  } catch (error) {
    console.error("getAllUsers error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const blockUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    await user.update({ status: "Blocked" });
    return res.status(200).json({ message: `${user.name} blocked successfully.` });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};

export const unblockUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    await user.update({ status: "Active" });
    return res.status(200).json({ message: `${user.name} unblocked successfully.` });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};