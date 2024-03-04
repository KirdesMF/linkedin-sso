import { redirect } from "next/navigation";

export async function GET() {
  const params = {
    response_type: "code",
    client_id: process.env.LINKEDIN_CLIENT_ID as string,
    redirect_uri: "http://localhost:3000/linkedin/callback", // TODO: dev and prod
    state: "foobar",
    scope: "openid,profile,email",
  };

  const url = `https://www.linkedin.com/oauth/v2/authorization?${new URLSearchParams(
    params
  ).toString()}`;

  redirect(url);
}
