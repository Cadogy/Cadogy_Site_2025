import Link from "next/link"
import { useUserData } from "@/providers/UserDataProvider"
import {
  BoltIcon,
  ChevronDownIcon,
  KeyIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
} from "lucide-react"
import { signOut } from "next-auth/react"
import { FaBolt, FaCog, FaHome, FaKey } from "react-icons/fa"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserProfileProps {
  // Make user optional since we can get it from context
  user?: {
    id: string
    name: string | null
    email: string | null
    image: string | null
  }
}

export function UserProfile({ user: propUser }: UserProfileProps) {
  // Get user data from context if not provided via props
  const { userData: contextUser } = useUserData()

  // Use prop data if provided, otherwise use context data
  const user = propUser || {
    id: contextUser.id,
    name: contextUser.name,
    email: contextUser.email,
    image: contextUser.image,
  }

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

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 px-2 py-1.5"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-left text-sm font-medium leading-none">
              {user?.name || user?.email?.split("@")[0]}
            </p>
            <p className="text-left text-xs text-muted-foreground">
              {user?.email}
            </p>
          </div>
          <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            {user?.name && <p className="text-sm font-medium">{user.name}</p>}
            {user?.email && (
              <p className="text-xs text-muted-foreground">{user.email}</p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex cursor-pointer items-center">
            <FaHome className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/api-keys"
            className="flex cursor-pointer items-center"
          >
            <FaKey className="mr-2 h-4 w-4" />
            My Keys
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/settings"
            className="flex cursor-pointer items-center"
          >
            <FaCog className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/usage"
            className="flex cursor-pointer items-center"
          >
            <FaBolt className="mr-2 h-4 w-4" />
            Usage
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex cursor-pointer items-center text-destructive focus:text-destructive"
          onSelect={handleSignOut}
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
