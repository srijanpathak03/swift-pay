import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

// Prevent static generation for this route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: "Not authenticated",
      }),
      {
        status: 401,
      }
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session.user.id),
    },
  });

  return NextResponse.json({ user: user });
}
