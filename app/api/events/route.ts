import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        guests: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events: " + error },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.date || !data.location) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: title, date, and location are required",
        },
        { status: 400 }
      );
    }

    // Generate a slug from the title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Create the event
    const event = await prisma.event.create({
      data: {
        ...data,
        slug,
        date: new Date(data.date),
        description: data.description || "",
        guests: data.guests
          ? {
              createMany: {
                data: data.guests,
              },
            }
          : undefined,
      },
      include: {
        guests: true,
      },
    });

    return NextResponse.json(
      { message: "Event created successfully", event },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
