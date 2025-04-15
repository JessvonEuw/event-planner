import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import prisma from '@/lib/db';
import { compare, hash } from 'bcrypt';
import { updateUserSchema } from '@/schemas/user.schema';

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string };
    const body = await request.json();

    // Validate the request body
    const validatedData = updateUserSchema.safeParse({
      id: decoded.userId,
      ...body,
    });

    if (!validatedData.success) {
      return NextResponse.json(
        { message: 'Invalid data', errors: validatedData.error.errors },
        { status: 400 }
      );
    }

    const { name, email, currentPassword, newPassword } = validatedData.data;

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          id: { not: decoded.userId },
        },
      });

      if (existingUser) {
        return NextResponse.json(
          { message: 'Email is already taken' },
          { status: 400 }
        );
      }
    }

    // If changing password, verify current password
    if (newPassword) {
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { password: true },
      });

      if (!user || !currentPassword) {
        return NextResponse.json(
          { message: 'Current password is required to change password' },
          { status: 400 }
        );
      }

      const isPasswordValid = await compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { message: 'Current password is incorrect' },
          { status: 400 }
        );
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        name,
        email,
        ...(newPassword && { password: await hash(newPassword, 10) }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 