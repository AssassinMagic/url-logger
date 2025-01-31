'use client'

import useRedirector from "@/app/lib/redirector";
import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';

interface LocationPageProps {
  searchParams: { location?: string };
}

export default async function LocationPage({ searchParams }: LocationPageProps) {
  const { location } = searchParams;

  // If the "location" query parameter is missing or not a string, show a 404 page.
  if (!location || typeof location !== 'string') {
    notFound();
  }

  // Construct the path to the CSV file
  const csvFilePath = path.join(process.cwd(), 'data', 'locations.csv');
  let csvData: string;
  try {
    csvData = await fs.readFile(csvFilePath, 'utf8');
  } catch (error) {
    console.error('Error reading CSV file:', error);
    notFound();
  }

  // Parse the CSV data assuming one location per line
  const validLocations = csvData
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '');

  // If the requested location is not in the CSV list, show a 404 page.
  if (!validLocations.includes(location)) {
    notFound();
  }

  useRedirector();
  return <div>Redirecting...</div>;
}
