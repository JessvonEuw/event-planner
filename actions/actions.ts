"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { EventCreateInput } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createEvent(formData: EventCreateInput) {
  try {
    await prisma.event.create({
      data: {
        title: formData.get("title")?.toString() || "",
        startDate: new Date(formData.get("startDate") as string),
        endDate: new Date(formData.get("endDate") as string),
        description: formData.get("description")?.toString() || "",
        location: formData.get("location")?.toString() || "",
        notes: formData.get("notes")?.toString() || "",
        slug: formData
          .get("title")
          ?.toString()
          .replace(/\s+/g, "-")
          .toLowerCase(),
      },
      user: {
        connect: {
          id: "1",
        },
      },
    });

    revalidatePath("/events");
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return "Event with this title already exists";
      }
    }
  }
}
