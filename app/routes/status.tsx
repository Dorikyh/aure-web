import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Layout from "../components/Layout";
import { FaDiscord, FaServer, FaClock } from "react-icons/fa";

// Tipado de los datos del loader
type StatusData = {
  botStatus: "Online" | "Offline";
  apiStatus: "Online" | "Offline";
  uptime: string;
};

// Loader con tipado explícito
export const loader: LoaderFunction = async () => {
  console.log("Loader ejecutándose...");
  try {
    const [botResponse, apiResponse] = await Promise.all([
      fetch("https://discord.com/api/guilds/946513035936301157/widget.json"),
      fetch("https://us.mysrv.us/status"),
    ]);

    const botData = botResponse.ok ? await botResponse.json() : null;
    const botStatus: "Online" | "Offline" =
      botData?.members?.some((member: { username: string }) => member.username === "Aure")
        ? "Online"
        : "Offline";

    const apiData = apiResponse.ok ? await apiResponse.json() : null;
    const apiStatus: "Online" | "Offline" = apiResponse.ok ? "Online" : "Offline";
    const uptime = apiData?.uptime || "";

    return json<StatusData>({ botStatus, apiStatus, uptime });
  } catch (error) {
    console.error("Error en el loader:", error);
    return json<StatusData>({ botStatus: "Offline", apiStatus: "Offline", uptime: "" });
  }
};

// Componente principal con tipado
export default function Status() {
  const { botStatus, apiStatus, uptime } = useLoaderData<StatusData>();

  const formatUptime = (uptime: string): string => {
    if (!uptime) return "N/A";
    const [hours, minutes] = uptime.split(":");
    return `${hours} hours and ${minutes} minutes`;
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center dark:bg-gray-900 dark:text-gray-200">
        <h1 className="text-6xl sm:text-7xl font-bold text-center dark:text-white mb-4">
          Status
        </h1>
        <p className="text-lg text-center text-gray-500 dark:text-gray-400 mb-8">
          Technical information about Aure.
        </p>

        <div className="flex flex-wrap justify-center gap-6 max-w-4xl w-full">
          {/* Bot Status */}
          <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-80 flex flex-col items-center transition-transform transform hover:scale-105">
            <FaDiscord className="text-5xl text-blue-600 dark:text-white mb-2" />
            <h2 className="text-2xl font-semibold text-center">Discord Bot</h2>
            <p
              className={`text-2xl font-bold mt-2 ${
                botStatus === "Online" ? "text-green-400" : "text-red-400"
              }`}
            >
              {botStatus}
            </p>
          </div>

          {/* API Status */}
          <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-80 flex flex-col items-center transition-transform transform hover:scale-105">
            <FaServer className="text-5xl text-gray-600 dark:text-white mb-2" />
            <h2 className="text-2xl font-semibold text-center">API</h2>
            <p
              className={`text-2xl font-bold mt-2 ${
                apiStatus === "Online" ? "text-green-400" : "text-red-400"
              }`}
            >
              {apiStatus}
            </p>
            {apiStatus === "Online" && (
              <div className="mt-2 flex items-center text-gray-500 dark:text-gray-400">
                <FaClock className="mr-2 text-lg" />
                <p className="text-lg font-medium">{formatUptime(uptime)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
