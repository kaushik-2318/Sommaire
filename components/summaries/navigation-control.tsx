import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NavigationControl({
  currentSection,
  totalSection,
  onPrevious,
  onNext,
  onSectionSelect,
}: {
  currentSection: number;
  totalSection: number;
  onPrevious: () => void;
  onNext: () => void;
  onSectionSelect: (index: number) => void;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xs border-t border-rose-500/10">
      <div className="flex justify-center items-center">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={onPrevious}
          disabled={currentSection === 0}
          className={cn(
            "rounded-full w-12 h-12 transition-all duration-200 bg-linear-to-br from-rose-500 to-rose-600 backdrop-blur-xs border border-rose-500/10",
            currentSection === 0 ? "opacity-50" : "hover:bg-rose-500/20"
          )}
        >
          <ChevronLeft className="w-6 h-6 " />
        </Button>

        <div className="flex gap-2">
          {Array.from({ length: totalSection }).map((_, index) => (
            <button
              key={index}
              onClick={() => onSectionSelect(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentSection === index
                  ? "bg-linear-to-r from-rose-500 to rose-600"
                  : "bg-rose-500/20 hover:bg-rose-500/30"
              )}
            />
          ))}
        </div>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={onNext}
          disabled={currentSection === totalSection - 1}
          className={cn(
            "rounded-full w-12 h-12 transition-all duration-200 bg-linear-to-br from-rose-500 to-rose-600 backdrop-blur-xs border border-rose-500/10",
            currentSection === 0 ? "opacity-50" : "hover:bg-rose-500/20"
          )}
        >
          <ChevronRight className="w-6 h-6 " />
        </Button>
      </div>
    </div>
  );
}
