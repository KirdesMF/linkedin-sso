import Link from "next/link";

export default function Login() {
  const params = {
    response_type: "code",
    client_id: process.env.LINKEDIN_CLIENT_ID as string,
    redirect_uri: "http://localhost:3000/linkedin/callback", // TODO: dev and prod
    scope: "openid,profile,email",
  };

  const url = `https://www.linkedin.com/oauth/v2/authorization?${new URLSearchParams(
    params
  ).toString()}`;

  return (
    <main>
      <h1>Login</h1>
      <Link href="/">Home</Link>
      <Link href={url}>log in</Link>
    </main>
  );
}
