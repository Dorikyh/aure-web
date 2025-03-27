import { FaStar, FaArrowRight } from "react-icons/fa";
import Layout from "../components/Layout";

export default function VotePage() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 transition-all duration-300 bg-gradient-to-r from-blue-400 to-purple-500 text-gray-900 dark:bg-gray-900 dark:text-white">
        {/* Title */}
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Vote for Aure on Top.gg
        </h1>
        
        {/* Engaging description */}
        <p className="text-lg sm:text-xl max-w-3xl text-gray-200 dark:text-gray-400 mb-6">
          Support Aure by voting on <span className="text-yellow-300 font-semibold">Top.gg</span>. Every vote helps us grow and provide better features for you!
        </p>
        
        {/* Vote button */}
        <a
          href="https://top.gg/bot/946513035936301157/vote"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-400 dark:bg-yellow-300 text-gray-900 dark:text-gray-900 px-8 py-3 rounded-full text-lg font-semibold flex items-center gap-2 shadow-xl hover:bg-yellow-500 dark:hover:bg-yellow-400 transition-all"
        >
          <FaStar className="text-white" />
          Vote Now
          <FaArrowRight />
        </a>
      </div>
    </Layout>
  );
}
