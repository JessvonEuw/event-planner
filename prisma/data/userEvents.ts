import { Prisma } from "@prisma/client";

const userEvents: Prisma.UserEventUncheckedCreateInput[] = [
  {
    userId: "1",
    eventId: "1",
  },
  {
    userId: "1",
    eventId: "2",
  },
  {
    userId: "3",
    eventId: "3",
  },
  {
    userId: "5",
    eventId: "4",
  },
  {
    userId: "3",
    eventId: "5",
  },
  {
    userId: "5",
    eventId: "6",
  },
];

export default userEvents;
