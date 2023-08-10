import { getActiveAccessToken } from '@/utils/getActiveAccessToken';
import { parseReferer } from '@/utils/parseReferer';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const orgId = '170849'
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN
export async function POST(request: NextRequest) {
  const data = await request.formData()

  console.log('data', data);
  // const access_token = await getActiveAccessToken()
  const {Name, Email, Name_2, Input, ...rest} = Object.fromEntries(data)
  // @ts-ignore
  const position = rest['Специализация'] ?? parseReferer(request.headers.referer as string)
  console.log('position', position);
  
  const body = { first_name: Name.toString().split(' ')[0], last_name: Name.toString().split(' ')[1] ?? '' , middle_name: Name.toString().split(' ')[2] ?? '', email: Email, city: Name_2, resume_link: Input, position }
  const hunfFlowBody = {
    "first_name": body.first_name,
    "last_name": body.last_name,
    "middle_name": body.middle_name,
    "money": "",
    "phone": "",
    "email": body.email,
    "skype": "",
    "position": body.position,
    "company": "",
    "externals": [
      {
        "auth_type": "NATIVE",
        "data": {
          "body": `Город: ${Name_2}\n${body.resume_link}`
        },
      }
    ],
  }
  try {
    const result = await fetch(`https://api.huntflow.ru/v2/accounts/${orgId}/applicants`, {
      "headers": {
        "authorization": `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      "body": JSON.stringify(hunfFlowBody),
      "method": "POST"
    }).then(res => res.json())
    console.log('result', result);
  } catch (e) {
    console.log('error', e);
  }

  return NextResponse.json(
    {
      result: 'OK',
    },
    {
      status: 200,
    },
  );
}
