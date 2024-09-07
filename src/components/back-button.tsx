import { Link } from "next-view-transitions";
import { Button } from "./ui/button";
import { LeftArrowIcon } from "./icons";
import { CSSProperties } from "react";

interface Props {
  url?: string;
  text?: string;
  style?: CSSProperties;
}

export function BackButton({ url, text, style }: Props) {
  return (
    <div className="my-16" style={style}>
      <Link href={url || "/"}>
        <Button variant="outline" className="rounded-full">
          <LeftArrowIcon className="h-4 w-4 mr-2" /> {text || "Regresar"}
        </Button>
      </Link>
    </div>
  );
}
