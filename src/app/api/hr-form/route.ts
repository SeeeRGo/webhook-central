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
  console.log('data', data);
  

  //return the data back or just do whatever you want with it
  // res.json({
  //   status: 'ok',
  //   data
  // })
  // Add output webhook here

  // const {Name, Email, Name_2, Input, data, $_POST} = request.body
  // try {
  // } catch (e) {
  //   console.log('error', e);
    
  // }
  // console.log('request', {
  //   Name, Email, Name_2, Input, data, $_POST
  // });
  
  return NextResponse.json(
    {
      // body,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    },
  );
}
