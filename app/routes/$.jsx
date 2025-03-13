import { Link } from "@remix-run/react";
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout>
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-6xl md:text-7xl font-bold ">not found</h1>
      <p className="md:text-lg text-gray-800 dark:text-gray-300 mt-2 mb-4 text-sm">
        the page you're looking for doesn't exist :/
      </p>
      <Link
        to="/"
        className="mt-3 text-xl px-6 py-2 bg-indigo-600 font-semibold text-white rounded-lg hover:bg-blue-700 transition"
      >
        go back
      </Link>
    </div>
    </Layout>
  );
}
