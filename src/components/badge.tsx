import { cn } from "@/lib/utils";

interface BadgeProps {
  children?: React.ReactNode;
  active?: boolean;
}
export function Badge({ children, active }: BadgeProps) {
  return (
    <div
      className={cn(
        "px-3 py-1 z-20 text-xs rounded-full bg-black/90 text-white flex items-center gap-1 font-medium shadow-md",
        active && "bg-cyan-500/90 text-white"
      )}
    >
      {children}
    </div>
  );
}
