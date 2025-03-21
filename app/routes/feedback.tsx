import { Link } from "@remix-run/react";
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout>
          <div className="justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-6xl md:text-7xl font-bold ">Feedback</h1>
      <p className="md:text-lg text-gray-800 dark:text-gray-300 mt-2 mb-4 text-sm">
        the page you're looking for doesn't exist :/
      </p>
    </div>
    
    
    </Layout>
  );
}
