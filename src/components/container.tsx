import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}
export function Container({ children, className }: Props) {
  return (
    <div className={cn("container mx-auto max-w-5xl px-4 ms:px-0", className)}>
      {children}
    </div>
  );
}
