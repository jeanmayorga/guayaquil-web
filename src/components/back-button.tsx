import { Link } from "next-view-transitions";
import { Button } from "./ui/button";
import { LeftArrowIcon } from "./icons";
import { CSSProperties } from "react";

interface Props {
  url?: string;
  text?: string;
}

export function BackButton({ url, text }: Props) {
  return (
    <div className="my-6 md:my-12" style={{ viewTransitionName: `title` }}>
      <Link href={url || "/"}>
        <Button variant="ghost" className="rounded-full">
          <LeftArrowIcon className="h-4 w-4 mr-2" /> {text || "Regresar"}
        </Button>
      </Link>
    </div>
  );
}
