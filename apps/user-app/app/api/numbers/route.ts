import { NextRequest, NextResponse } from "next/server";

// Prevent static generation for this route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const numbers = [];

  // Generate random 10 Indian mobile numbers
  for (let i = 0; i < 10; i++) {
    // Indian mobile numbers start with 6, 7, 8, or 9 followed by 9 digits
    const firstDigit = Math.floor(Math.random() * 4) + 6; // 6, 7, 8, or 9
    let number = firstDigit.toString();

    // Generate the remaining 9 digits
    for (let j = 0; j < 9; j++) {
      number += Math.floor(Math.random() * 10).toString();
    }

    numbers.push(number);
  }

  return NextResponse.json({ numbers });
}
