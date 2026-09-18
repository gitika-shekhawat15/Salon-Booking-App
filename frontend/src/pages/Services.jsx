import { useEffect, useState } from "react";
import api from "../services/api.js";
import ServiceCard from "../components/ServiceCard.jsx";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");

        setServices(response.data.services);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <p>Loading services...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
  <div className="mx-auto max-w-6xl px-6 pt-10">
    <h1 className="text-3xl font-bold">
      Our Services
    </h1>

    <p className="mt-2 text-gray-600">
      Choose a service and book your appointment.
    </p>
  </div>
 <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-2 lg:grid-cols-3">
  {services.map((service) => (
    <ServiceCard
      key={service._id}
      service={service}
    />
  ))}
</div>
</div>

  )
}

export default Services;