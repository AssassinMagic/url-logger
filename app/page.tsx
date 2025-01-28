'use client'

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const logAndRedirect = async () => {
      try {
        const currentUrl = window.location.href;

        // Log the URL to the API
        await fetch("/api/logUrl", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ endpoint: currentUrl }),
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
