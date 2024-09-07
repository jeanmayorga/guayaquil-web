import { Link } from "next-view-transitions";
import { Button } from "./ui/button";
import { LeftArrowIcon } from "./icons";

interface Props {
  url?: string;
}

export function BackButton({ url }: Props) {
  return (
    <div className="my-16">
      <Link href={url || "/"}>
        <Button variant="outline" className="rounded-full">
          <LeftArrowIcon className="h-4 w-4 mr-2" /> Regresar
        </Button>
      </Link>
    </div>
  );
}
