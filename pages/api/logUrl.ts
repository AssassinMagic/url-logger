import { NextApiRequest, NextApiResponse } from "next";
const { Pool } = require('pg');

// Set up PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Ensure compatibility with Neon
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { endpoint } = req.body;
      if (!endpoint) {
        return res.status(400).json({ error: "Endpoint is required" });
      }
      
      // Parse the URL to extract query parameters.
      let parsedUrl;
      try {
        parsedUrl = new URL(endpoint);
      } catch (error) {
        return res.status(400).json({ error: "Invalid URL provided" });
      }
      
      // Extract the eventID and location from the query parameters.
      const eventID = parsedUrl.searchParams.get("eventID");
      const location = parsedUrl.searchParams.get("location");
      
      if (!eventID || !location) {
        return res.status(400).json({ error: "Both eventID and location query parameters are required." });
      }
      
      // Insert the eventID and location into the database.
      await pool.query(
        "INSERT INTO endpoints (event_id, location, created_at) VALUES ($1, $2, NOW())",
        [eventID, location]
      );
      
      return res.status(200).json({ message: "URL logged successfully" });
    } catch (error) {
      console.error("Error logging URL:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
