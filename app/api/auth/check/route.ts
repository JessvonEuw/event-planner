import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
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