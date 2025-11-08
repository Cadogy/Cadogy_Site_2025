import { getServerSession } from "next-auth"
import { createUploadthing, type FileRouter } from "uploadthing/next"

import { authOptions } from "@/lib/auth/auth-options"

const f = createUploadthing()

export const ourFileRouter = {
  profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions)

      if (!session?.user) throw new Error("Unauthorized")

      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { imageUrl: file.url }
    }),
  dashboardBackground: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions)

      if (!session?.user || session.user.role !== "admin") {
        throw new Error("Admin access required")
      }

      return { userId: session.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { imageUrl: file.url }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
