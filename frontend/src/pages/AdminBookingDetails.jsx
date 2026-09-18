import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api.js";

function AdminBookingDetails() {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          setError("You are not authorized.");
          return;
        }

        const response = await api.get(`/bookings/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBooking(response.data.booking);
      } catch (error) {
        console.error("Failed to fetch booking:", error);

        if (error.response?.status === 401 || error.response?.status === 403) {
          setError("You are not authorized to view this booking.");
        } else {
          setError("Failed to load booking details.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading booking details...</p>;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (!booking) {
    return <p className="p-6">Booking not found.</p>;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link
        to="/admin/dashboard"
        className="text-sm text-gray-600 hover:text-black"
      >
        ← Back to Dashboard
      </Link>

      <div className="mt-6 rounded-xl border bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">Booking Details</h1>
            <p className="mt-2 text-sm text-gray-500">
              Booking ID: {booking._id}
            </p>
          </div>

          <span className="rounded-full border px-4 py-2 text-sm font-medium">
            {booking.status}
          </span>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Customer Name</p>
            <p className="mt-1 font-medium">{booking.customerName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="mt-1 font-medium">{booking.phone}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="mt-1 font-medium">{booking.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Service</p>
            <p className="mt-1 font-medium">
              {booking.service?.name || "Service unavailable"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="mt-1 font-medium">
              {booking.service ? `₹${booking.service.price}` : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="mt-1 font-medium">
              {booking.service
                ? `${booking.service.duration} minutes`
                : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="mt-1 font-medium">
              {new Date(booking.date).toLocaleDateString("en-IN")}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="mt-1 font-medium">{booking.time}</p>
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <p className="text-sm text-gray-500">Notes</p>
          <p className="mt-2">
            {booking.notes || "No additional notes."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminBookingDetails;