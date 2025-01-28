'use client'

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const logAndRedirect = async () => {
      try {
        const currentUrl = window.location.href;

        // Use the URL API to get the path and extract the last part
        const url = new URL(currentUrl);
        const pathSegments = url.pathname.split("/").filter(Boolean); // Split and remove empty segments
        const lastSegment = pathSegments[pathSegments.length - 1]; // Get the last part

        // Log the last part of the URL to the API
        await fetch("/api/logUrl", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ endpoint: lastSegment }),
        });

        // Redirect to the Google Form
        window.location.href = "https://forms.google.com/your-google-form-link";
      } catch (error) {
        console.error("Error logging URL or redirecting:", error);
      }
    };

    logAndRedirect();
  }, []);

  return <div>Redirecting...</div>;
}
