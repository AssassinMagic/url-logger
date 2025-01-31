'use client'

import React from 'react';
import useRedirector from "@/app/lib/redirector";

export default function Director() {
  useRedirector();
  return <div>Redirecting...</div>;
}