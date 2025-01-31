'use client'

import useRedirector from "@/app/lib/redirector";

export default function Director() {
  useRedirector();
  return <div>Redirecting...</div>;
}