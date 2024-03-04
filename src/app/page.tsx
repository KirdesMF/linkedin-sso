import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <Link href="/protected">Protected</Link>
      <Link href="/login">Login</Link>
    </main>
  );
}
