import { CalendarIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function EventItemSkeleton() {
  return (
    <div
      className={cn(
        "w-full flex-none rounded-2xl overflow-hidden transition-all"
      )}
    >
      <div className="relative overflow-hidden bg-gray-150 flex items-center justify-center h-[200px] rounded-xl">
        <Skeleton className="w-full h-[200px]" />
      </div>
      <div className="py-4 pb-2">
        <div className="flex items-center text-cyan-500 font-medium mb-2 text-xs gap-2 transition-all">
          <CalendarIcon />
          <Skeleton className="w-[200px] h-[8px] bg-cyan-200 rounded-full" />
        </div>
        <Skeleton className="w-[150px] h-[20px] rounded-full mb-2" />
        <Skeleton className="w-[190px] h-[12px] rounded-full" />
      </div>
    </div>
  );
}
