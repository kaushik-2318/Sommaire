"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function UploadFormInput({ onSubmit }: UploadFormInputProps) {
  return (
    <div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex justify-end items-center gap-1.5">
          <Input
            type="file"
            id="file"
            name="file"
            accept="application/pdf"
            required
            className=""
          />
          <Button className="hover:cursor-pointer bg-rose-600 hover:bg-rose-700">
            {" "}
            Upload Your Pdf
          </Button>
        </div>
      </form>
    </div>
  );
}
