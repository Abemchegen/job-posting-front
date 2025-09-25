import fetch from "node-fetch";

export default async function handler(req, res) {
  const { slug } = req.query;
  const backendUrl = `${process.env.API_BASE_URL}/${slug.join("/")}`;

  // Prepare headers, remove problematic ones
  const headers = { ...req.headers };
  delete headers.host;
  delete headers["content-length"];
  delete headers.connection;

  // Prepare body
  let body = undefined;
  if (req.method !== "GET" && req.body) {
    if (typeof req.body === "object") {
      body = JSON.stringify(req.body);
      headers["content-type"] = "application/json";
    } else {
      body = req.body;
    }
  }

  try {
    const response = await fetch(backendUrl, {
      method: req.method,
      headers,
      body,
    });

    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
      res.status(response.status).json(data);
    } else {
      data = await response.text();
      res.status(response.status).send(data);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Proxy request failed", details: error.message });
  }
}
