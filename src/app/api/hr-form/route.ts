import { hrFormAccessKey, orgId } from '@/constants';
import { getNewAccessToken } from '@/utils/getNewAccessToken';
import { parseReferer } from '@/utils/parseReferer';
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const accessToken = await kv.get<string>(hrFormAccessKey);
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

    if('errors' in result) {
      const tokenExpired = result.errors.some(({ detail, type }: any) => type === "authorization_error" && detail === "token_expired")
      if(tokenExpired) {
        const newToken = await getNewAccessToken()
        const newResult = await fetch(`https://api.huntflow.ru/v2/accounts/${orgId}/applicants`, {
          "headers": {
            "authorization": `Bearer ${newToken}`,
            "content-type": "application/json",
          },
          "body": JSON.stringify(hunfFlowBody),
          "method": "POST"
        }).then(res => res.json())
        console.log('newResult', newResult);
      }
    }
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
