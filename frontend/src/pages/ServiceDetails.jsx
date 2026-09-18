import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api.js";

function ServiceDetails() {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await api.get(`/services/${id}`);

        setService(response.data.service);
      } catch (error) {
        console.error("Failed to fetch service:", error);
        setError("Failed to load service details");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return <p>Loading service...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!service) {
    return <p>Service not found</p>;
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        to="/services"
        className="text-sm text-gray-600 hover:text-black"
      >
        ← Back to Services
      </Link>

      <div className="mt-6 rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">
          {service.name}
        </h1>

        <p className="mt-4 text-gray-600">
          {service.description}
        </p>

        <div className="mt-6 flex gap-8">
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-xl font-semibold">
              ₹{service.price}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="text-xl font-semibold">
              {service.duration} minutes
            </p>
          </div>
        </div>

        <Link
          to={`/booking/${service._id}`}
          className="mt-8 block rounded-lg bg-black px-5 py-3 text-center text-white hover:bg-gray-800"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

export default ServiceDetails;