"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

type ActionState = {
  error?: string;
};

export async function createEvent(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    // Log all form data entries
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const title = formData.get("title")?.toString();
    const date = formData.get("date")?.toString();
    const description = formData.get("description")?.toString();
    const location = formData.get("location")?.toString();
    const notes = formData.get("notes")?.toString();

    // Check each required field individually
    if (!title) {
      return { error: "Title is required" };
    }
    if (!date) {
      return { error: "Date is required" };
    }
    if (!location) {
      return { error: "Location is required" };
    }

    await prisma.event.create({
      data: {
        title,
        date: new Date(date),
        description: description || "",
        location,
        notes: notes || "",
        slug: title.replace(/\s+/g, "-").toLowerCase(),
      },
    });

    revalidatePath("/events");
    return { error: undefined };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { error: "Title is already taken" };
      }
    }
    return { error: "An unexpected error occurred" };
  }
}
