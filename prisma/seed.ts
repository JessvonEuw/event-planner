import { PrismaClient, Event, Prisma } from "@prisma/client";
import getUsers from "./data/users";
import events from "./data/events";
import userEvents from "./data/userEvents";

const prisma = new PrismaClient();

async function main() {
  try {
    // Delete all existing data
    await prisma.guest.deleteMany();
    await prisma.userEvent.deleteMany();
    await prisma.event.deleteMany();
    await prisma.user.deleteMany();
    console.log("Deleted all existing data");

    // Reset sequence and create users
    const users = await getUsers();
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.user.createMany({ data: users });
    console.log("Created users with sequential IDs");

    // Reset sequence for Event table
    await prisma.$executeRaw`TRUNCATE TABLE "Event" RESTART IDENTITY CASCADE`;

    // Create events one by one with guests
    const createdEvents: Event[] = [];
    for (let i = 0; i < events.length; i++) {
      const event = events[i];

      // Extract nested data
      const { guests: eventGuests, ...eventData } = event;

      // Create the event first
      const createdEvent = await prisma.event.create({
        data: eventData,
      });
      createdEvents.push(createdEvent);

      console.log(
        `Created event: ${createdEvent.title} with ID: ${createdEvent.id}`
      );

      // Create guests for this event
      if (eventGuests?.createMany?.data) {
        const guestData = Array.isArray(eventGuests.createMany.data)
          ? eventGuests.createMany.data
          : [eventGuests.createMany.data];

        const guestsWithEventId: Prisma.GuestCreateManyInput[] = guestData.map(
          (guest) => ({
            name: guest.name,
            email: guest.email,
            phone: guest.phone,
            attending: guest.attending,
            notes: guest.notes,
            eventId: createdEvent.id,
          })
        );

        await prisma.guest.createMany({
          data: guestsWithEventId,
        });
        console.log(
          `Added ${guestsWithEventId.length} guests to event: ${createdEvent.title}`
        );
      }
    }

    // Create user-event associations from separate data file
    await prisma.$executeRaw`TRUNCATE TABLE "UserEvent" RESTART IDENTITY CASCADE`;

    // Map the userEvents data to use the actual event IDs
    const mappedUserEvents = userEvents.map((ue, index) => ({
      userId: ue.userId,
      eventId: createdEvents[index % createdEvents.length].id,
    }));

    await prisma.userEvent.createMany({
      data: mappedUserEvents,
    });
    console.log(`Created ${mappedUserEvents.length} user-event associations`);

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
