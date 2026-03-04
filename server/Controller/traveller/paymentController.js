import Payment from "../../Model/traveller/Payment.js";

export const createPayment = async (req, res) => {
  try {
    const { bookingId, method, amount } = req.body;
    const payment = await Payment.create({ bookingId, method, amount, status: "Success" });
    return res.status(201).json({ message: "Payment successful.", payment });
  } catch (error) {
    console.error("Payment error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};