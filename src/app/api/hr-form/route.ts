import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Formidable } from "formidable";
import { NextApiResponse } from 'next';

//set bodyparser
export const config = {
  api: {
    bodyParser: false
  }
}

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

export async function POST(request: NextRequest, res: NextApiResponse) {
  const data = await new Promise((resolve, reject) => {
    const form = new Formidable();

    // @ts-ignore
    form.parse(request, (err, fields, files) => {
      if (err) reject({ err })
      console.log('fields', fields);
      
      resolve({ err, fields, files })
    }) 
  })

  //return the data back or just do whatever you want with it
  res.status(200).json({
    status: 'ok',
    data
  })
}
  // Add output webhook here

  // const {Name, Email, Name_2, Input, data, $_POST} = request.body
  // try {
  // } catch (e) {
  //   console.log('error', e);
    
  // }
  // console.log('request', {
  //   Name, Email, Name_2, Input, data, $_POST
  // });
  
  // return NextResponse.json(
  //   {
  //     // body,
  //     path: request.nextUrl.pathname,
  //     query: request.nextUrl.search,
  //     cookies: request.cookies.getAll(),
  //   },
  //   {
  //     status: 200,
  //   },
  // );
}
