import { Badge } from "../ui/badge";
import { Sparkles } from "lucide-react";

export default function UploadHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
        <Badge
          variant={"secondary"}
          className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors"
        >
          <Sparkles className="h-6 w-6 text-rose-600 animate-pulse mr-2" />
          <p className="text-base">AI-Powered Content Creation</p>
        </Badge>
      </div>
      <div className="font-bold tracking-tighter capitalize text-3xl text-gray-900 sm:text-4xl">
        Start Uploading{" "}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">Your PDF's</span>{" "}
          <span
            className="absolute inset-0 bg-rose-200/50 rounded-lg animate-rotate"
            aria-hidden="true"
          ></span>
        </span>{" "}
      </div>
      <div>
        <div className="mt-2 text-xl leading-8 text-gray-600 max-w-2xl text-center">
          <p>Upload your PDF and let our Al do the magic!✨</p>
        </div>
      </div>
    </div>
  );
}
