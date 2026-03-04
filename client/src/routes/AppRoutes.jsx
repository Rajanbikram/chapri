import { Routes, Route } from "react-router-dom";
import LandingPage from "../page/public/LandingPage";
import Login from "../page/public/auth/Login";
import Register from "../page/public/auth/Register";
import Dashboard from "../page/private/traveller/Dashboard";
import Overview from "../page/private/traveller/overview";
import FlightSearch from "../page/private/traveller/FlightSearch";
import SeatAvailability from "../page/private/traveller/SeatAvailability";
import FilterFlights from "../page/private/traveller/FilterFlights";
import FlightDetails from "../page/private/traveller/FlightDetails";
import SeatSelection from "../page/private/traveller/SeatSelection";
import Payment from "../page/private/traveller/Payment";
import BookingConfirmation from "../page/private/traveller/BookingConfirmation";
import ManageBookings from "../page/private/traveller/ManageBookings";
import PrivateRoute from "./PrivateRoutes";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    >
      <Route index element={<Overview />} />
      <Route path="search" element={<FlightSearch />} />
      <Route path="availability" element={<SeatAvailability />} />
      <Route path="filter" element={<FilterFlights />} />
      <Route path="details" element={<FlightDetails />} />
      <Route path="seats" element={<SeatSelection />} />
      <Route path="payment" element={<Payment />} />
      <Route path="confirmation" element={<BookingConfirmation />} />
      <Route path="manage" element={<ManageBookings />} />
    </Route>
  </Routes>
);

export default AppRoutes;