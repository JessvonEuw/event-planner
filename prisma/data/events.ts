import { Prisma } from "@prisma/client";

const events: Prisma.EventCreateInput[] = [
  {
    title: "Carl's Birthday Bash",
    slug: "carls-birthday-bash",
    description:
      "Join us for a night of fun and games as we celebrate Carl's 30th birthday!",
    startDate: new Date("2025-03-15T19:00:00Z"),
    location: "123 Main St, Anytown, Canada",
    notes: "Please bring a dish to share. BYOB.",
    guests: {
      createMany: {
        data: [
          {
            name: "Bob Doe",
            email: "bob.doe@example.com",
            phone: "123-456-7890",
            attending: true,
            notes: "Allergic to nuts",
          },
          {
            name: "Helen Doe",
            email: "helen.doe@example.com",
            phone: "123-456-7891",
            attending: true,
            notes: "Bringing a +1",
          },
          {
            name: "Michael Johnson",
            email: "michael.johnson@example.com",
            phone: "123-456-7892",
            attending: false,
            notes: "Out of town that weekend",
          },
          {
            name: "Emily Davis",
            email: "emily.davis@example.com",
            phone: "123-456-7893",
            attending: false,
            notes: "Hasn't responded yet - pending",
          },
          {
            name: "Robert Wilson",
            email: "robert.wilson@example.com",
            phone: "123-456-7894",
            attending: true,
            notes: "Vegetarian meal preference",
          },
        ],
      },
    },
  },
  {
    title: "Tech Meetup",
    slug: "tech-meetup",
    description:
      "Come to hear about the latest trends in tech and network with other professionals.",
    startDate: new Date("2025-04-08T19:00:00Z"),
    endDate: new Date("2025-04-10T19:00:00Z"),
    location: "Tech Centre, Anytown, Canada",
    notes: "Please bring your business cards.",
    guests: {
      createMany: {
        data: [
          {
            name: "Sarah Thompson",
            email: "sarah.thompson@example.com",
            phone: "123-456-7895",
            attending: true,
            notes: "Plus one: David Miller",
          },
          {
            name: "James Anderson",
            email: "james.anderson@example.com",
            phone: "123-456-7896",
            attending: true,
            notes: "Gluten-free meal required",
          },
          {
            name: "Jennifer Martinez",
            email: "jennifer.martinez@example.com",
            phone: "123-456-7897",
            attending: false,
            notes: "Sending a gift",
          },
          {
            name: "Daniel Taylor",
            email: "daniel.taylor@example.com",
            phone: "123-456-7898",
            attending: true,
            notes: "Coming from out of town, needs accommodation info",
          },
          {
            name: "Jessica Brown",
            email: "jessica.brown@example.com",
            phone: "123-456-7899",
            attending: false,
            notes: "Invitation sent, awaiting response - pending",
          },
        ],
      },
    },
  },
  {
    title: "Monthly Book Club",
    slug: "monthly-book-club",
    description: "We're reading 'The Women' by Kristin Hannah.",
    startDate: new Date("2025-03-28T19:00:00Z"),
    location: "123 Main St, Anytown, Canada",
    notes: "Please bring a copy of the book.",
    guests: {
      createMany: {
        data: [
          {
            name: "Thomas Clark",
            email: "thomas.clark@example.com",
            phone: "123-456-7900",
            attending: true,
            notes: "CEO of Partner Company",
          },
          {
            name: "Lisa Rodriguez",
            email: "lisa.rodriguez@example.com",
            phone: "123-456-7901",
            attending: true,
            notes: "Presenting at the event",
          },
          {
            name: "William Lee",
            email: "william.lee@example.com",
            phone: "123-456-7902",
            attending: false,
            notes: "Schedule conflict",
          },
          {
            name: "Patricia Walker",
            email: "patricia.walker@example.com",
            phone: "123-456-7903",
            attending: true,
            notes: "Requires vegetarian option",
          },
          {
            name: "Christopher Hall",
            email: "christopher.hall@example.com",
            phone: "123-456-7904",
            attending: true,
            notes: "Interested in networking opportunities",
          },
        ],
      },
    },
  },
  {
    title: "Weekly BJJ Class",
    slug: "weekly-bjj-class",
    description: "Practicing our submissions and sweeps.",
    startDate: new Date("2025-03-13T19:00:00Z"),
    location: "BJJ Gym, Anytown, Canada",
    notes: "Please bring a water bottle and a towel.",
    guests: {
      createMany: {
        data: [
          {
            name: "Charles Scott",
            email: "charles.scott@example.com",
            phone: "123-456-7910",
            attending: true,
            notes: "Former teacher",
          },
          {
            name: "Nancy Green",
            email: "nancy.green@example.com",
            phone: "123-456-7911",
            attending: true,
            notes: "Family friend",
          },
          {
            name: "Matthew Adams",
            email: "matthew.adams@example.com",
            phone: "123-456-7912",
            attending: false,
            notes: "Out of the country",
          },
          {
            name: "Karen Baker",
            email: "karen.baker@example.com",
            phone: "123-456-7913",
            attending: true,
            notes: "Bringing graduation gift",
          },
          {
            name: "Joshua Nelson",
            email: "joshua.nelson@example.com",
            phone: "123-456-7914",
            attending: false,
            notes: "Classmate, waiting for confirmation - pending",
          },
        ],
      },
    },
  },
  {
    title: "Cool board games event",
    slug: "cool-board-games-event",
    description: "Random games, random people, random fun.",
    startDate: new Date("2025-04-12T19:00:00Z"),
    endDate: new Date("2025-04-20T19:00:00Z"),
    location: "123 Main St, Anytown, Canada",
    notes: "Please bring a board game to share.",
    guests: {
      createMany: {
        data: [
          {
            name: "Donna Carter",
            email: "donna.carter@example.com",
            phone: "123-456-7915",
            attending: true,
            notes: "Bringing a plant as housewarming gift",
          },
          {
            name: "Paul Mitchell",
            email: "paul.mitchell@example.com",
            phone: "123-456-7916",
            attending: true,
            notes: "Neighbor from previous residence",
          },
          {
            name: "Michelle Perez",
            email: "michelle.perez@example.com",
            phone: "123-456-7917",
            attending: false,
            notes: "Previous commitment",
          },
          {
            name: "Mark Roberts",
            email: "mark.roberts@example.com",
            phone: "123-456-7918",
            attending: true,
            notes: "Bringing wine and cheese",
          },
          {
            name: "Laura Turner",
            email: "laura.turner@example.com",
            phone: "123-456-7919",
            attending: false,
            notes: "Needs directions to the new house - pending response",
          },
        ],
      },
    },
  },
  {
    title: "Bella's Baby Shower",
    slug: "bella-s-baby-shower",
    description: "Join us to celebrate Bella's upcoming arrival!",
    startDate: new Date("2025-05-22T19:00:00Z"),
    location: "123 Main St, Anytown, Canada",
    notes: "Please bring a gift for the baby.",
    guests: {
      createMany: {
        data: [
          {
            name: "Elizabeth Young",
            email: "elizabeth.young@example.com",
            phone: "123-456-7905",
            attending: true,
            notes: "Bringing a gift",
          },
          {
            name: "Richard King",
            email: "richard.king@example.com",
            phone: "123-456-7906",
            attending: false,
            notes: "Sending a gift card",
          },
          {
            name: "Susan Wright",
            email: "susan.wright@example.com",
            phone: "123-456-7907",
            attending: true,
            notes: "Close friend of the mother",
          },
          {
            name: "Joseph Lopez",
            email: "joseph.lopez@example.com",
            phone: "123-456-7908",
            attending: false,
            notes: "Needs to check calendar - pending response",
          },
          {
            name: "Margaret Hill",
            email: "margaret.hill@example.com",
            phone: "123-456-7909",
            attending: true,
            notes: "Grandmother of the baby",
          },
        ],
      },
    },
  },
];

export default events;
