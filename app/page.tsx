'use client'

import React from 'react';
import useRedirector from "@/app/lib/redirector";

export default function Home() {
  useRedirector();
  return <div>Redirecting...</div>;
}