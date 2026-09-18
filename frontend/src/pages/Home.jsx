import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gray-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <p className="font-medium uppercase tracking-widest text-gray-500">
              Salon Service Booking
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Look good.
              <br />
              Feel confident.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
              Book your favorite salon services easily and choose a time
              that works for you.
            </p>

            <Link
              to="/services"
              className="mt-8 inline-block rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
            >
              Explore Services
            </Link>
          </div>

          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <div className="text-6xl">✂️</div>

            <h2 className="mt-6 text-2xl font-semibold">
              Your beauty, your time.
            </h2>

            <p className="mt-3 leading-7 text-gray-600">
              From hair care to skincare and beauty services, choose a
              service and book your appointment in just a few steps.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold">
            Everything you need for your salon visit
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Browse our services, check pricing and duration, and book an
            appointment without any hassle.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border p-6">
            <div className="text-2xl">💇</div>

            <h3 className="mt-4 text-xl font-semibold">
              Quality Services
            </h3>

            <p className="mt-2 text-gray-600">
              Choose from a range of salon and beauty services.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <div className="text-2xl">📅</div>

            <h3 className="mt-4 text-xl font-semibold">
              Easy Booking
            </h3>

            <p className="mt-2 text-gray-600">
              Select your preferred date and time and book online.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <div className="text-2xl">✨</div>

            <h3 className="mt-4 text-xl font-semibold">
              Simple Experience
            </h3>

            <p className="mt-2 text-gray-600">
              A clean and straightforward booking experience.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold">
            Ready to book your appointment?
          </h2>

          <p className="mt-3 text-gray-600">
            Explore our services and find the right one for you.
          </p>

          <Link
            to="/services"
            className="mt-6 inline-block rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
          >
            Book an Appointment
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;