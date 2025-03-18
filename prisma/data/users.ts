import { Role, Prisma } from "@prisma/client";
import { hash } from "bcrypt";

async function getUsers(): Promise<Array<Prisma.UserCreateInput>> {
  return [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      password: await hash("password", 10),
      role: Role.ADMIN,
    },
    {
      id: "2",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: await hash("password", 10),
      role: Role.USER,
    },
    {
      id: "3",
      name: "John Smith",
      email: "john.smith@example.com",
      password: await hash("password", 10),
      role: Role.ADMIN,
    },
    {
      id: "4",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: await hash("password", 10),
      role: Role.USER,
    },
    {
      id: "5",
      name: "Colin Jost",
      email: "colin.jost@example.com",
      password: await hash("password", 10),
      role: Role.ADMIN,
    },
  ];
}

export default getUsers;
