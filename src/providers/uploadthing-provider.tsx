"use client"

import { ReactNode } from "react"
import { UploadButton, UploadDropzone } from "@uploadthing/react"
import { UploadThingError } from "uploadthing/server"

interface UploadThingProviderProps {
  children: ReactNode
}

export function UploadThingProvider({ children }: UploadThingProviderProps) {
  return <>{children}</>
}
