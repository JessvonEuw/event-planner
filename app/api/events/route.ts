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
    const formData = await request.formData();
    
    // Extract event details
    const title = formData.get('title')?.toString();
    const description = formData.get('description')?.toString();
    const date = formData.get('date')?.toString();
    const location = formData.get('location')?.toString();
    const notes = formData.get('notes')?.toString();
    const guestsJson = formData.get('guests')?.toString();

    // Validate required fields
    if (!title || !date || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Parse guests
    let guests = [];
    if (guestsJson) {
      try {
        guests = JSON.parse(guestsJson);
      } catch {
        return NextResponse.json(
          { error: 'Invalid guests data' },
          { status: 400 }
        );
      }
    }

    // Create event with guests in a transaction
    const event = await prisma.$transaction(async (tx) => {
      // Create the event
      const event = await tx.event.create({
        data: {
          title,
          date: new Date(date),
          description: description || '',
          location,
          notes: notes || '',
          slug: title.replace(/\s+/g, '-').toLowerCase(),
        },
      });

      // Create guests if any
      if (guests.length > 0) {
        await tx.guest.createMany({
          data: guests.map((guest: { name: string; email: string }) => ({
            name: guest.name,
            email: guest.email,
            eventId: event.id,
          })),
        });
      }

      return event;
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
