'use client'

import { useEffect } from "react";

export default function useRedirector() {
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
        window.location.href = "https://swad-form.vercel.app/";
      } catch (error) {
        console.error("Error logging URL or redirecting:", error);
      }
    };

    logAndRedirect();
  }, []);
}
