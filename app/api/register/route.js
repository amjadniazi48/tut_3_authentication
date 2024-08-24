import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; 

export async function POST(request) {
  const { username, email, password } = await request.json();
  try {
    const response = await fetch('http://localhost:1337/api/auth/local/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Create a NextResponse object and set the cookie using the cookies API
      const nextResponse = NextResponse.json(data, { status: response.status });
      
      // Set the JWT as a cookie
      cookies().set('token', data.jwt, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/', // Cookie is available on all routes
      });

      return nextResponse;
    } else {
      // Handle Strapi error responses
      const errorMessage = data.error?.message || 'Registration failed';
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Signup failed' }, { status: 400 });
  }
}
