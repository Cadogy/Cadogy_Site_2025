import { useState } from "react"
import Image from "next/image"
import { Pencil } from "lucide-react"

import { UploadButton } from "@/lib/utils/uploadthing"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { OurFileRouter } from "@/app/api/uploadthing/core"

interface UploadAvatarProps {
  userId: string
  imageUrl?: string | null
  name?: string | null
  email?: string | null
  onUploadComplete: (url: string) => void
  onRemove: () => void
}

export function UploadAvatar({
  userId,
  imageUrl,
  name,
  email,
  onUploadComplete,
  onRemove,
}: UploadAvatarProps) {
  const [isHovering, setIsHovering] = useState(false)

  // Get initials for avatar fallback
  const getInitials = () => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    }
    return email?.substring(0, 2).toUpperCase() || "U"
  }

  return (
    <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
      <div
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Avatar className="h-20 w-20">
          <AvatarImage src={imageUrl || ""} alt={name || "User"} />
          <AvatarFallback className="text-xl">{getInitials()}</AvatarFallback>
        </Avatar>

        {imageUrl && isHovering && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
            <Pencil className="h-5 w-5 text-white" />
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <h3 className="font-medium">Profile Picture</h3>
        <p className="text-sm text-muted-foreground">
          Your profile picture helps personalize your account
        </p>
        <div className="flex space-x-2">
          <UploadButton
            endpoint="profileImage"
            onClientUploadComplete={(res) => {
              if (res && res.length > 0 && res[0].url) {
                // Call the onUploadComplete callback with the URL
                onUploadComplete(res[0].url)

                toast({
                  title: "Upload complete",
                  description: "Your profile picture has been updated.",
                })
              }
            }}
            onUploadError={(error: Error) => {
              toast({
                title: "Upload error",
                description: error.message || "Something went wrong",
                variant: "destructive",
              })
            }}
            className="ut-button:bg-primary ut-button:text-primary-foreground ut-button:h-8 ut-button:px-3 ut-button:text-sm ut-allowed-content:hidden"
          />
          {imageUrl && (
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => {
                onRemove()
                toast({
                  title: "Profile picture removed",
                })
              }}
            >
              Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
