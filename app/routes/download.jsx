import { json } from "@remix-run/node";

export async function loader({ request }) {
  const url = new URL(request.url);
  const fileUrl = url.searchParams.get("url");

  if (!fileUrl) {
    return json({ error: "Missing 'url' parameter" }, { status: 400 });
  }

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch file");
    }

    const originalName = decodeURIComponent(fileUrl.split("/").pop() || "file");
    const fileName = `aure-${originalName}`;

    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Type": response.headers.get("content-type") || "application/octet-stream",
      },
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    return json({ error: "Failed to download file" }, { status: 500 });
  }
}
