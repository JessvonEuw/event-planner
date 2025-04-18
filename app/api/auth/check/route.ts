import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify the token
    verify(token, process.env.JWT_SECRET || 'your-secret-key');

    return NextResponse.json({ message: 'Authenticated' });
  } catch {
    return NextResponse.json(
      { message: 'Not authenticated' },
      { status: 401 }
    );
  }
} 