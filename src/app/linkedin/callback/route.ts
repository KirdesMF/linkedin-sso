import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code") as string;

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:3000/linkedin/callback");
  params.append("client_id", process.env.LINKEDIN_CLIENT_ID as string);
  params.append("client_secret", process.env.LINKEDIN_CLIENT_SECRET as string);

  const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const { access_token } = await res.json();

  const profile = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const profileJson = await profile.json();

  const response = NextResponse.redirect(new URL("/protected", request.url), {
    status: 302,
  });

  response.cookies.set("linkedin", JSON.stringify(profileJson), {
    httpOnly: true,
  });

  return response;
}
