// app/routes/stats.jsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Info } from "react-feather";
import Layout from "~/components/Layout";

// Loader: Fetches statistics data from the API.
export async function loader() {
  try {
    const response = await fetch("https://us.mysrv.us/stats");
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data = await response.json();
    return json(data);
  } catch (error) {
    console.error("Loader error:", error);
    return json({ error: "Error fetching data" });
  }
}

// Mapping API keys to friendly labels in English
const friendlyLabels = {
  // Autopost
  active: "Active",
  sent: "Sent",
  cached_posts: "Cached Posts",
  total_sent: "Total Sent",
  // Commands
  today: "Today",
  week: "This Week",
  execution_success_today: "Today success",
  execution_success_week: "Week success",
  // Errors
  today: "Today",
  week: "This Week",
  // Bot
  servers: "Servers",
  users: "Users",
  shards: "Shards",
  // System
  net_sent_kbps: "Net Sent",
  net_recv_kbps: "Net Received",
  memory_usage_mb: "Memory",
  cpu_temperature: "Temperature",
};

// Descriptions for each statistic
const explanations = {
  // Autopost
  active: "Number of active scheduled posts.",
  sent: "Total posts sent so far.",
  cached_posts: "Posts that have been cached.",
  total_sent: "Historical total of posts sent.",
  // Commands
  today: "Number of commands executed today.",
  week: "Number of commands executed in the past week.",
  execution_success_today: "Percentage of commands executed successfully today.",
  execution_success_week: "Percentage of commands executed successfully this week.",
  // Errors
  today: "Number of errors encountered today.",
  week: "Number of errors encountered in the past week.",
  // Bot
  servers: "Number of servers where the bot is present.",
  users: "Number of users interacting with the bot.",
  shards: "Number of shards the bot uses.",
  // System
  net_sent_kbps: "Data sent speed in kilobits per second.",
  net_recv_kbps: "Data received speed in kilobits per second.",
  memory_usage_mb: "Current memory usage in megabytes.",
  cpu_temperature: "Current CPU temperature.",
};

// Function to format numbers
function formatNumber(value) {
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`;
  }
  return value.toLocaleString();
}

// Function to format values based on key and value
function formatValue(key, value) {
  if (typeof value !== "number") return value;
  if (key.includes("execution_success")) {
    return `${Math.floor(value)}%`;
  }
  return formatNumber(value);
}

function StatModal({ statKey, value, label, explanation, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      {/* Modal content */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 z-10 w-11/12 md:w-1/2">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">{label}</h2>
        <p className="text-xl font-semibold dark:text-white">
          {value !== null ? formatValue(statKey, value) : "N/A"}
        </p>
        <p className="mt-4 dark:text-gray-300">{explanation}</p>
        <button
          onClick={onClose}
          className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// Main component that displays statistics and controls the modal
export default function Stats() {
  const stats = useLoaderData();
  const [selectedStat, setSelectedStat] = useState(null);

  // Group the categories with their data
  const categories = [
    { title: "Autopost", data: stats.autopost },
    { title: "Commands", data: stats.commands },
    { title: "Errors", data: stats.errors },
    { title: "Bot", data: stats.bot },
    { title: "System", data: stats.system },
  ];

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-center dark:text-white">
          System Statistics
        </h1>
        <p className="text-center dark:text-gray-300 mt-4">
          Real-time technical data.
        </p>
        <div className="mt-8 space-y-8">
          {categories.map((category, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-semibold dark:text-white mb-4">
                {category.title}
              </h2>
              {/* Responsive grid: 2 columns on mobile, 3 on tablets, 4 on large screens */}
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {category.data &&
                  Object.entries(category.data).map(([key, value]) => {
                    // Get the friendly label or fallback to the original key
                    const label = friendlyLabels[key] || key;
                    const explanation =
                      explanations[key] ||
                      "No description available for this statistic.";
                    return (
                      <div
                        key={key}
                        className="relative bg-gray-200 dark:bg-gray-800 rounded-xl p-4 shadow flex flex-col items-center justify-center cursor-pointer"
                        onClick={() =>
                          setSelectedStat({ key, value, label, explanation })
                        }
                      >
                        {/* Help icon using an SVG, positioned at top-right */}
                        <span className="absolute top-2 right-2">
                          <Info height={10} width={10}/>
                        </span>
                        <p className="text-4xl font-bold dark:text-white">
                          {value !== null ? formatValue(key, value) : "N/A"}
                        </p>
                        <p className="text-sm dark:text-gray-300">{label}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal to show detailed statistic */}
      {selectedStat && (
        <StatModal
          statKey={selectedStat.key}
          value={selectedStat.value}
          label={selectedStat.label}
          explanation={selectedStat.explanation}
          onClose={() => setSelectedStat(null)}
        />
      )}
    </Layout>
  );
}
