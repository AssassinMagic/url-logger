// app/location/page.tsx
import React from 'react';
import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Director from '@/app/location/director';

export default async function LocationPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await the searchParams in case they're provided as a promise.
  const resolvedSearchParams = await searchParams;
  const { location, eventID } = resolvedSearchParams;

  // Validate that "location" and "eventID" are provided and are strings.
  if (!location || Array.isArray(location)) {
    notFound();
  }
  if (!eventID || Array.isArray(eventID)) {
    notFound();
  }

  // Construct the path to your CSV file.
  const csvFilePath = path.join(process.cwd(), 'data', 'locations.csv');

  let csvData: string = '';
  try {
    csvData = await fs.readFile(csvFilePath, 'utf8');
  } catch (error) {
    console.error('Error reading CSV file:', error);
    notFound();
  }

  // Parse the CSV.
  // Split the file into lines and filter out any empty lines.
  const lines = csvData
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '');

  if (lines.length === 0) {
    notFound();
  }

  // Check if the first line is a header by looking for keywords.
  let dataLines: string[] = [];
  if (
    lines[0].toLowerCase().includes('event') &&
    lines[0].toLowerCase().includes('location')
  ) {
    // Assume first line is a header.
    dataLines = lines.slice(1);
  } else {
    dataLines = lines;
  }

  // Validate that there is a row with the matching eventID and location.
  const isValid = dataLines.some(line => {
    const [csvEventID, csvLocation] = line
      .split(',')
      .map(field => field.trim());
    return csvEventID === eventID && csvLocation === location;
  });

  if (!isValid) {
    notFound();
  }

  // If valid, render the client component to perform the redirect.
  return <Director />;
}
