import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.formData()
  console.log('data', data);
  
  const {Name, Email, Name_2, Input} = Object.fromEntries(data)
  const body = { first_name: Name.toString(), last_name: Name.toString().split(' ')[1] ?? '' , email: Email, city: Name_2, resume_link: Input}

  const hunfFlowBody = {
    "first_name": body.first_name,
    "last_name": body.last_name,
    "money": "",
    "phone": "",
    "email": body.email,
    "skype": "",
    "position": "",
    "company": "",
    "birthday": "1900-01-01",
    "externals": [
      {
        "auth_type": "NATIVE",
        "data": {
          "body": body.resume_link
        },
      }
    ],
  }
  try {
    const result = await fetch("https://api.huntflow.ru/v2/accounts/170849/applicants", {
      "headers": {
        "authorization": "Bearer 814d6054241c75581dca8a3fed0317b66a79349fadba3b49be42f250d883354d",
        "content-type": "application/json",
      },
      "body": JSON.stringify(hunfFlowBody),
      "method": "POST"
    });
    const parsed = await result.json()
    console.log('parsed', parsed);
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

// {
//   "items": [
//     {
//       "id": 170849,
//       "name": "CosySoft",
//       "nick": "cosysoft",
//       "member_type": "owner",
//       "production_calendar": 1
//     }
//   ]
// }
// https://api.huntflow.ru/v2/accounts/170849/applicants?page=1
// https://api.huntflow.ru/v2/accounts/170849/applicants POST
