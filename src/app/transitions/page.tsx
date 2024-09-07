import { Link } from "next-view-transitions";

export default function Page() {
  return (
    <div>
      <div className="demo text-xl">Demo</div>
      <Link href="/transitions/1">Go to /transitions/1 →</Link>
    </div>
  );
}
