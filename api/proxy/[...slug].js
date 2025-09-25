import fetch from "node-fetch";

export default async function handler(req, res) {
  const { slug } = req.query; // slug = array of path segments
  const backendUrl = `${process.env.API_BASE_URL}/${slug.join("/")}`;

  try {
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: { ...req.headers, host: undefined },
      body: req.method !== "GET" ? req.body : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Proxy request failed", details: error.message });
  }
}
