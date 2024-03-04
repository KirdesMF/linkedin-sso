import Link from "next/link";
import { cookies } from "next/headers";

type User = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: { country: string; language: string };
};

export default function Protected() {
  const cookieStore = cookies();
  const user = cookieStore.get("linkedin");
  const data = JSON.parse(user!.value) as User;

  return (
    <main className="min-h-[100svh] grid place-content-center">
      <h1>Protected page</h1>

      <nav>
        <Link href="/">Home</Link>
        <Link href="/login">login</Link>
      </nav>

      <div className="border border-white rounded p-2 grid gap-y-2 place-items-center">
        <img src={data.picture} alt="profile picture" width={50} height={50} />
        <p>name: {data.name}</p>
        <p>given name: {data.given_name}</p>
        <p>family name: {data.family_name}</p>
        <p>email: {data.email}</p>
        <p>country: {data.locale.country}</p>
        <p>language: {data.locale.language}</p>
      </div>
    </main>
  );
}
