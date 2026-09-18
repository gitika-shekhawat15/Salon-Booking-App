import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

function AdminDashboard() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      const response = await api.get("/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(response.data.bookings);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);

      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (bookingId, status) => {
    try {
      const token = localStorage.getItem("adminToken");

      await api.patch(
        `/bookings/${bookingId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBookings();
    } catch (error) {
      console.error("Failed to update booking status:", error);
      setError("Failed to update booking status");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  if (loading) {
    return <p className="p-6">Loading bookings...</p>;
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage customer bookings and their status.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg border px-4 py-2 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="mt-8 overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="w-full min-w-[900px]">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Service</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

         <tbody>
  {bookings.length === 0 ? (
    <tr>
      <td
        colSpan="7"
        className="px-4 py-8 text-center text-gray-500"
      >
        No bookings found.
      </td>
    </tr>
  ) : (
    bookings.map((booking) => (
      <tr key={booking._id} className="border-b">
        {/* Customer */}
        <td className="px-4 py-4">
          <p className="font-medium">
            {booking.customerName}
          </p>

          <p className="text-sm text-gray-500">
            {booking.email}
          </p>
        </td>

        {/* Service */}
        <td className="px-4 py-4">
          {booking.service?.name || "Service unavailable"}
        </td>

        {/* Date */}
        <td className="px-4 py-4">
          {new Date(booking.date).toLocaleDateString("en-IN")}
        </td>

        {/* Time */}
        <td className="px-4 py-4">
          {booking.time}
        </td>

        {/* Phone */}
        <td className="px-4 py-4">
          {booking.phone}
        </td>

        {/* Status */}
        <td className="px-4 py-4">
          <select
            value={booking.status}
            onChange={(event) =>
              handleStatusChange(
                booking._id,
                event.target.value
              )
            }
            className="rounded-lg border px-3 py-2"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </td>

        {/* Action */}
        <td className="px-4 py-4">
          <button
            onClick={() =>
              navigate(`/admin/bookings/${booking._id}`)
            }
            className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
          >
            View Details
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;              