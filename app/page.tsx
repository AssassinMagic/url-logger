'use client'

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const logAndRedirect = async () => {
      try {
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