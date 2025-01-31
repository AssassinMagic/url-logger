// app/location/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Director from "@/app/location/director";

interface PageProps {
  searchParams: { location?: string | string[] };
}

export default async function LocationPage({ searchParams }: PageProps) {
  const { location } = searchParams;

  // Validate that "location" is provided and is a string.
  if (!location || Array.isArray(location)) {
    notFound();
  }

  // Construct the path to your CSV file.
  const csvFilePath = path.join(process.cwd(), 'data', 'locations.csv');

  let csvData: string;
  try {
    csvData = await fs.readFile(csvFilePath, 'utf8');
  } catch (error) {
    console.error('Error reading CSV file:', error);
    notFound();
  }

  // Parse the CSV assuming one location per line.
  const validLocations = csvData
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '');

  // If the provided location is not in the CSV, show a 404.
  if (!validLocations.includes(location)) {
    notFound();
  }

  // If valid, render the client component to perform the redirect.
  return <Director />;
}
