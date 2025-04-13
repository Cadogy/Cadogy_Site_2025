import { getServerSession } from "next-auth"
import { createUploadthing, type FileRouter } from "uploadthing/next"

import { authOptions } from "@/lib/auth/auth-options"

const f = createUploadthing()

export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique route key
  profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const session = await getServerSession(authOptions)

      // If you throw, the user will not be able to upload
      if (!session?.user) throw new Error("Unauthorized")

      // Whatever is returned here is accessible in onUploadComplete
      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId)

      console.log("File URL:", file.url)

      // Return the file URL or other data you want to access on the client
      return { imageUrl: file.url }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
