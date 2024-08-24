import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const response = NextResponse.json({ message: 'Success' });

  // Destroy the cookie
  cookies().set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'production',
    expires: new Date(0), // Expire the cookie immediately
    sameSite: 'strict',
    path: '/',
  });

  return response;
}
