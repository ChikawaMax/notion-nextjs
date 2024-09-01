// app/api/notion/route.ts
import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/notion';

export async function GET() {
  const data = await getDatabase();
  if (data) {
    return NextResponse.json({ results: data });
  } else {
    return NextResponse.error();
  }
}
