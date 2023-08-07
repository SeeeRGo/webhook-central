import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// //set bodyparser
// export const config = {
//   runtime: 'edge',
//   api: {
//     bodyParser: false
//   }
// }

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
  const data = await request.formData()
  const {Name, Email, Name_2, Input} = Object.fromEntries(data)
  const body = { name: Name, email: Email, city: Name_2, resume_link: Input}
  console.log('body', body);
  
  return NextResponse.json(
    {
      body,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    },
  );
}
