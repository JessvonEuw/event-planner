import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { slug: params.slug },
      include: {
        guests: true,
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
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

    // Update event with guests in a transaction
    const event = await prisma.$transaction(async (tx) => {
      // Update the event
      const event = await tx.event.update({
        where: { slug: params.slug },
        data: {
          title,
          date: new Date(date),
          description: description || '',
          location,
          notes: notes || '',
          slug: title.replace(/\s+/g, '-').toLowerCase(),
        },
      });

      // Delete existing guests
      await tx.guest.deleteMany({
        where: { eventId: event.id },
      });

      // Create new guests if any
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
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
} 