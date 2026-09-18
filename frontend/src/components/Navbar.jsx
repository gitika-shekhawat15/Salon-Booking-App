import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        <Link to="/" className="text-2xl font-bold">
          Salon Booking
        </Link>

        <div className="flex gap-6">
          <Link to="/" className="hover:text-gray-600">
            Home
          </Link>

          <Link to="/services" className="hover:text-gray-600">
            Services
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;