import { Link, useParams } from "react-router-dom";

function Confirmation() {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
        <div className="text-5xl">✓</div>

        <h1 className="mt-4 text-3xl font-bold">
          Booking Confirmed!
        </h1>

        <p className="mt-3 text-gray-600">
          Your appointment has been successfully booked.
        </p>

        <div className="mt-6 rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Booking ID
          </p>

          <p className="mt-1 break-all font-semibold">
            {id}
          </p>
        </div>

        <Link
          to="/services"
          className="mt-8 inline-block rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
        >
          Browse Services
        </Link>
      </div>
    </div>
  );
}

export default Confirmation;