import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
      },
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}