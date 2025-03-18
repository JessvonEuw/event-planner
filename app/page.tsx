import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl leading-tight font-bold text-gray-900">
        Welcome to Event Planner
      </h1>
      <p className="mt-3 text-lg text-gray-500">
        Plan and manage your events with ease.
      </p>

      <div className="mt-8 flex justify-center">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/login"
        >
          Login/Register
        </Link>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
          href="/events"
        >
          View Events
        </Link>
      </div>

      <h2 className="mt-12 text-2xl leading-tight font-bold text-gray-900">
        Featured Events
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Featured event cards */}
      </div>
    </div>
  );
}
