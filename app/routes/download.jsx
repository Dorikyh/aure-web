// app/routes/download.jsx
import { json } from "@remix-run/node";

export async function loader({ request }) {
  const url = new URL(request.url);
  const fileUrl = url.searchParams.get("url");

  if (!fileUrl) {
    return json({ error: "Missing URL parameter" }, { status: 400 });
  }

  try {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      return json({ error: "Failed to fetch file" }, { status: 500 });
    }

    // Obtener el nombre del archivo de la URL
    const fileName = fileUrl.split("/").pop();

    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Type": response.headers.get("content-type") || "application/octet-stream",
      },
    });
  } catch (error) {
    return json({ error: "Error downloading file" }, { status: 500 });
  }
}
