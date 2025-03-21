import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const guests = await prisma.guest.findMany();

    return NextResponse.json(guests);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch guests: " + error },
      { status: 500 }
    );
  }
}
