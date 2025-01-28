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

      // Save the endpoint to the database
      await pool.query("INSERT INTO endpoints (endpoint, created_at) VALUES ($1, NOW())", [endpoint]);

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
