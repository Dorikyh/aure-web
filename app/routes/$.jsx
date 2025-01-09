import { Link } from "@remix-run/react";
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout>
          <div className="py-24 min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-red-600">Not found</h1>
      <p className="text-lg text-gray-800 dark:text-gray-300 mt-2 mb-4">
        Oops! The page you're looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 text-xl px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
    </Layout>
  );
}
