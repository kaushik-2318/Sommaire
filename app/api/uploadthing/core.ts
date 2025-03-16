import { currentUser } from "@clerk/nextjs/server";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();
export const ourFileRouter = {
    pdfUploader: f({ pdf: { maxFileSize: '32MB' } }).
        middleware(
            async ({ req }) => {
                const user = await currentUser();

                if (!user) throw new UploadThingError("Unauthorized");

                return { userId: user.id };
            }).onUploadComplete(async ({ metadata, file }) => {
                console.log("Upload complete for userId:", metadata.userId);
                console.log("file url", file.ufsUrl);
                return { userId: metadata.userId, file };
            })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;