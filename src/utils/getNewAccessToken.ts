import { hrFormAccessKey, hrFormRefreshKey } from "@/constants";
import { kv } from "@vercel/kv";



export async function getNewAccessToken() {
  const refresh_token = await kv.get<string>(hrFormRefreshKey);
  const result: {access_token: string, refresh_token: string } = await fetch("https://api.huntflow.ru/v2/token/refresh", {
      "headers": {
        "content-type": "application/json",
      },
      "body": JSON.stringify({ refresh_token }),
      "method": "POST"
    })
    .then(res => res.json())
  console.log('result tokens', result);
  
  
  await kv.set(hrFormAccessKey, result.access_token || null)
  await kv.set(hrFormRefreshKey, result.refresh_token  || null)
  return result.access_token
}