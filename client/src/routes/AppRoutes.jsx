import { Routes, Route } from "react-router-dom";
import LandingPage from "../page/public/LandingPage";
import Login from "../page/public/auth/Login";
import Register from "../page/public/auth/Register";

// Traveller
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

// Owner
import OwnerDashboard from "../page/private/owner/ownerDashboard";
import OwnerOverview from "../page/private/owner/ownerOverview";
import AddFlight from "../page/private/owner/AddFlight";
import UpdateSchedule from "../page/private/owner/UpdateSchedule";
import TicketPricing from "../page/private/owner/TicketPricing";
import OwnerSeatAvailability from "../page/private/owner/ownerSeatAvailability";
import PassengerBookings from "../page/private/owner/PassengerBookings";
import CancellationDelay from "../page/private/owner/CancellationDelay";
import UserAccounts from "../page/private/owner/UserAccounts";

import PrivateRoute from "./PrivateRoutes";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* TRAVELLER */}
    <Route
      path="/dashboard"
      element={
        <PrivateRoute role="traveler">
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

    {/* OWNER */}
    <Route
      path="/owner-dashboard"
      element={
        <PrivateRoute role="airline_owner">
          <OwnerDashboard />
        </PrivateRoute>
      }
    >
      <Route index element={<OwnerOverview />} />
      <Route path="add-flight" element={<AddFlight />} />
      <Route path="update-schedule" element={<UpdateSchedule />} />
      <Route path="pricing" element={<TicketPricing />} />
      <Route path="seats" element={<OwnerSeatAvailability />} />
      <Route path="bookings" element={<PassengerBookings />} />
      <Route path="cancellation" element={<CancellationDelay />} />
      <Route path="users" element={<UserAccounts />} />
    </Route>
  </Routes>
);

export default AppRoutes;