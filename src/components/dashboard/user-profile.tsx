import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserProfileProps {
  user: {
    id: string
    name: string | null
    email: string | null
    image: string | null
  }
}

export function UserProfile({ user }: UserProfileProps) {
  // Get initials for avatar fallback
  const getInitials = () => {
    if (user?.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    }
    return user?.email?.substring(0, 2).toUpperCase() || "U"
  }

  return (
    <div className="flex items-center space-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
        <AvatarFallback>{getInitials()}</AvatarFallback>
      </Avatar>
      <div className="hidden md:block">
        <p className="text-sm font-medium leading-none">
          {user?.name || user?.email?.split("@")[0]}
        </p>
        <p className="text-xs text-muted-foreground">{user?.email}</p>
      </div>
    </div>
  )
}
