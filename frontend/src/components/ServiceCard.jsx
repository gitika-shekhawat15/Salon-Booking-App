import { Link } from "react-router-dom";


function ServiceCard({ service }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        {service.name}
      </h2>

      <p className="mt-2 text-gray-600">
        {service.description}
      </p>

      <div className="mt-4 flex justify-between">
        <span className="font-semibold">
          ₹{service.price}
        </span>

        <span className="text-gray-600">
          {service.duration} min
        </span>
      </div>

      <Link
        to={`/services/${service._id}`}
        className="mt-5 block rounded-lg bg-black px-4 py-2 text-center text-white hover:bg-gray-800"
      >
        View Details
      </Link>
    </div>
  );
}

export default ServiceCard;