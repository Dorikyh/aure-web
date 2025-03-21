// app/routes/download-client.jsx
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import Layout from '../components/Layout';

export async function loader({ request }) {
  const url = new URL(request.url);
  const fileUrl = url.searchParams.get("url");

  if (!fileUrl) {
    return new Response("Missing URL", { status: 400 });
  }

  // Redirigir al endpoint de descarga
  return { downloadUrl: `/download?url=${encodeURIComponent(fileUrl)}` };
}

export default function DownloadPage() {
  const { downloadUrl } = useLoaderData();

  useEffect(() => {
    if (downloadUrl) {
      window.location.href = downloadUrl;
    }
  }, [downloadUrl]);

  return (
    <Layout>
    <div className="h-screen flex flex-col justify-center items-center">
      <p className="text-lg font-semibold">Starting download...</p>
    </div>
    </Layout>
  );
}
