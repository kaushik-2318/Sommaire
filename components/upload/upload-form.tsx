"use client";
import { toast } from "sonner";
import { useUploadThing } from "@/utils/uploadthings";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { generatePdfSummary } from "@/actions/upload-action";
import { useRef, useState } from "react";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine(
      (file) => file.size < 20 * 1024 * 1024,
      "File Must be less than 20MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "Invalid file type"
    ),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      toast("Error occurred while uploading", {
        description: (
          <span className="text-red-500 font-semibold">{err.message}</span>
        ),
      });
    },
    onUploadBegin: ({ file }) => {
      console.log("upload has begun for file");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      console.log("Selected File:", file);
      if (!file) {
        console.error("No file selected");
        return;
      }

      const validedFields = schema.safeParse({ file });
      if (!validedFields.success) {
        toast("❌ Something went Wrong", {
          description: (
            <span className="text-red-500 font-semibold">
              {validedFields.error.flatten().fieldErrors.file?.[0] ??
                "Invalid File"}
            </span>
          ),
        });
        setIsLoading(false);
        return;
      }

      toast("Uploading PDF", {
        description: (
          <span className="text-blue-500 font-semibold">
            We are uploading your PDF to our servers! 🚀
          </span>
        ),
      });

      const res = await startUpload([file]);
      if (!res) {
        toast("⚠️ Something Went Wrong", {
          description: (
            <span className="text-red-500 font-semibold">
              Please use a different file.
            </span>
          ),
        });
        setIsLoading(false);
        return;
      }

      toast("📃Processing PDF", {
        description: (
          <span className="text-green-500 font-semibold">
            Hang tight! Our AI is reading through your document! ✨
          </span>
        ),
      });

      const result = await generatePdfSummary(res);

      const { data = null, message = null } = result || {};

      if (data) {
        toast("Saving PDF", {
          description: (
            <span className="text-green-500 font-semibold">
              Hang tight! We Are saving your summary! ✨
            </span>
          ),
        });
        formRef.current?.reset();
        // if(data.summary){}
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error Occured");
      formRef.current?.reset();
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
