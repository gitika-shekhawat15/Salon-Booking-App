import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api.js";

function Booking() {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    notes: "",
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await api.get(`/services/${serviceId}`);
        setService(response.data.service);
      } catch (error) {
        console.error("Failed to fetch service:", error);
        setError("Failed to load service");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      const response = await api.post("/bookings", {
        ...formData,
        service: serviceId,
      });

      navigate(`/confirmation/${response.data.booking._id}`);
    } catch (error) {
      console.error("Booking failed:", error);

      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.message ||
        "Booking failed. Please try again.";

      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!service) {
    return <p>Service not found</p>;
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-3xl font-bold">
        Book {service.name}
      </h1>

      <div className="mt-4 rounded-lg border p-4">
        <p>
          <strong>Price:</strong> ₹{service.price}
        </p>

        <p>
          <strong>Duration:</strong> {service.duration} minutes
        </p>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
      >
        <div>
          <label className="mb-1 block font-medium">
            Name
          </label>

          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Phone
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
            placeholder="Enter 10-digit phone number"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Date
          </label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Time
          </label>

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Notes
          </label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-lg border px-4 py-3"
            placeholder="Any special requests?"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {submitting ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}

export default Booking;