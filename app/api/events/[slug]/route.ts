import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    // Find the event by slug
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

    // If user is authenticated, verify they have access to the event
    if (token) {
      try {
        const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string };
        const userId = decoded.userId;

        // Check if user has access to this event
        const userEvent = await prisma.userEvent.findFirst({
          where: {
            userId,
            eventId: event.id,
          },
        });

        // If user doesn't have access, return 403
        if (!userEvent) {
          return NextResponse.json(
            { error: 'Access denied' },
            { status: 403 }
          );
        }
      } catch (error) {
        // If token is invalid, continue without user verification
        console.error('Token verification failed:', error);
      }
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