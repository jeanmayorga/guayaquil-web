import Link from "next/link";
import { Button } from "./ui/button";
import { LeftArrowIcon } from "./icons";

export function BackButton() {
  return (
    <div className="my-16">
      <Link href="/">
        <Button variant="outline" className="rounded-full">
          <LeftArrowIcon className="h-4 w-4 mr-2" /> Regresar
        </Button>
      </Link>
    </div>
  );
}
