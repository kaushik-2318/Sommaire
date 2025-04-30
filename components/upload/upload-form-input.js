"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { forwardRef } from "react";

export const UploadFormInput = (({ onSubmit, isLoading }, ref) => {
    return (
        <div>
            <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
                <div className="flex justify-end items-center gap-1.5">
                    <Input
                        type="file"
                        id="file"
                        name="file"
                        accept="application/pdf"
                        required
                        className={cn(isLoading && "opacity-50 cursor-not-allowed")}
                        disabled={isLoading}
                    />
                    <Button
                        disabled={isLoading}
                        className="hover:cursor-pointer bg-rose-600 hover:bg-rose-700"
                    >
                        {isLoading ? (
                            <>
                                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Upload Your Pdf"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
});

// UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;
