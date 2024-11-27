import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  id?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}
export function ButtonTab({ id, active, onClick, className, children }: Props) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={cn(
        "py-2 px-4 bg-gray-200/80 dark:bg-gray-700/80 hover:bg-cyan-500/50 hover:text-cyan-800 rounded-full text-sm font-medium text-gray-500 dark:text-gray-400 transition-all active:scale-95 text-nowrap",
        active &&
          "bg-cyan-500/50 dark:bg-cyan-500/50 text-cyan-800 dark:text-white/70 active",
        className
      )}
    >
      {children}
    </button>
  );
}
