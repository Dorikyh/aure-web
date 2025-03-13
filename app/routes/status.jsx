import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Layout from '../components/Layout';
export async function loader() {
  console.log("Loader ejecutándose...");
  try {
    const [botResponse, apiResponse, webResponse] = await Promise.all([
      fetch("https://discord.com/api/guilds/946513035936301157/widget.json"),
      fetch("https://us.mysrv.us/status"),
    ]);

    const botData = botResponse.ok ? await botResponse.json() : null;
    const botStatus = botData?.members?.find((member) => member.username === "Aure")
      ? "Online"
      : "Offline";

    const apiData = apiResponse.ok ? await apiResponse.json() : null;
    const apiStatus = apiResponse.ok ? "Online" : "Offline";
    const uptime = apiData?.uptime || "";

    return json({
      botStatus,
      apiStatus,
      uptime,
    });
  } catch (error) {
    console.error("Error en el loader:", error);
    return json({
      botStatus: "Offline",
      apiStatus: "Offline",
      uptime: "",
    });
  }
}


// Componente principal
export default function Status() {
  const { botStatus, apiStatus, webStatus, uptime } = useLoaderData();

  const formatUptime = (uptime) => {
    if (!uptime) return "N/A";
    const [hours, minutes] = uptime.split(":");
    return `${hours} hours and ${minutes} minutes`;
  };

  return (
    <Layout>
          <div>
      <h1 className="text-6xl sm:text-7xl font-semibold text-center dark:text-white">
        Status
      </h1>
      <p className="text-center dark:text-white mb-12">
        Technical information about Aure in realtime.
      </p>
      <main className="md:flex md:flex-wrap md:justify-center gap-8">
        {/* Bot Status */}
        <div className="bg-gray-300 dark:bg-gray-800 rounded-2xl p-6 mb-4">
          <h2 className="dark:text-white text-4xl font-semibold">Discord Bot</h2>
          <p
            className="text-3xl font-semibold"
            style={{ color: botStatus === "Online" ? "#77DD77" : "#ff6961" }}
          >
            {botStatus}
          </p>
        </div>

        {/* API Status */}
        <div className="bg-gray-300 dark:bg-gray-800 rounded-2xl p-6">
          <h2 className="dark:text-white text-4xl font-semibold">API</h2>
          <p
            className="text-3xl font-semibold"
            style={{ color: apiStatus === "Online" ? "#77DD77" : "#ff6961" }}
          >
            {apiStatus}
          </p>
          <p className="text-lg dark:text-gray-400 font-semibold">
            {apiStatus === "Online" ? formatUptime(uptime) : "No data available"}
          </p>
        </div>
      </main>
    </div> 
    </Layout>
  );
}
