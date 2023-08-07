import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export function GET(request: NextRequest) {
  // Add output webhook here
  console.log('request', {
    body: request.body,
    path: request.nextUrl.pathname,
    query: request.nextUrl.search,
    cookies: request.cookies.getAll(),
  });
  
  return NextResponse.json(
    {
      body: request.body,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    },
  );
}

export async function POST(request: NextRequest) {
  // Add output webhook here
  const body = await request.json()
  console.log('request', {
    body,
    path: request.nextUrl.pathname,
    query: request.nextUrl.search,
    cookies: request.cookies.getAll(),
  });
  
  return NextResponse.json(
    {
      body: request.body,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    },
  );
}
