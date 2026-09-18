import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import ServiceDetails from "./pages/ServiceDetails.jsx";
import Booking from "./pages/Booking.jsx";
import Confirmation from "./pages/Confirmation.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminBookingDetails from "./pages/AdminBookingDetails.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/booking/:serviceId" element={<Booking />} />
        <Route path="/confirmation/:id" element={<Confirmation />} />

        <Route path="/admin/login" element={<AdminLogin />} />
     
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
     <Route
  path="/admin/bookings/:id"
  element={<AdminBookingDetails />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;