"use client"

import { Suspense, useCallback, useEffect, useState } from "react"
import { Bell, Shield, Trash2, User } from "lucide-react"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { UploadAvatar } from "@/components/upload-avatar"

// Skeleton component for the profile section
function ProfileSectionSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="mb-2 h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="flex flex-col space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            </div>

            <Skeleton className="h-px w-full" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>

          <Skeleton className="h-9 w-24" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function SettingsPage() {
  const { data: session, update: updateSession } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isLoadingUserData, setIsLoadingUserData] = useState(true)

  // Form states
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [notifications, setNotifications] = useState({
    apiUsage: true,
    security: true,
    marketing: false,
    newsletter: false,
  })

  // Password form states
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  // Fetch full user data from the server with useCallback
  const fetchUserData = useCallback(async () => {
    setIsLoadingUserData(true)
    try {
      const response = await fetch("/api/user/profile")
      if (response.ok) {
        const userData = await response.json()
        setName(userData.name || "")
        setEmail(userData.email || "")
        setProfileImage(userData.image || null)
        //console.log("Fetched user data:", userData)
      } else {
        console.error("Failed to fetch user data")
        // Fallback to session data if API fails
        setName(session?.user?.name || "")
        setEmail(session?.user?.email || "")
        setProfileImage(session?.user?.image || null)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      // Fallback to session data if API fails
      setName(session?.user?.name || "")
      setEmail(session?.user?.email || "")
      setProfileImage(session?.user?.image || null)
    } finally {
      setIsLoadingUserData(false)
    }
  }, [session?.user?.name, session?.user?.email, session?.user?.image])

  // Fetch notification preferences with useCallback
  const fetchNotificationPreferences = useCallback(async () => {
    try {
      const response = await fetch("/api/settings/notifications")
      if (response.ok) {
        const data = await response.json()
        setNotifications(data.preferences)
      }
    } catch (error) {
      console.error("Error fetching notification preferences:", error)
    }
  }, [])

  // Fetch user data from API
  useEffect(() => {
    if (session?.user?.id) {
      fetchUserData()
      fetchNotificationPreferences()
    }
  }, [session?.user?.id, fetchUserData, fetchNotificationPreferences])

  // Update profile information
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/settings/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Also update session for UI consistency
        await updateSession({
          user: {
            ...session?.user,
            name,
            email,
          },
        })

        toast({
          title: "Profile updated",
          description:
            "Your profile information has been updated successfully.",
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to update profile",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Update notification preferences
  const handleUpdateNotifications = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/settings/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notifications),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Notification preferences updated",
          description: "Your notification settings have been saved.",
        })
      } else {
        toast({
          title: "Error",
          description:
            data.error || "Failed to update notification preferences",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating notifications:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Update password
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long")
      return
    }

    if (!/\d/.test(newPassword)) {
      setPasswordError("Password must contain at least one number")
      return
    }

    setIsChangingPassword(true)

    try {
      const response = await fetch("/api/settings/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Password updated",
          description: "Your password has been changed successfully.",
        })
        // Clear password fields
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        setPasswordError(data.error || "Failed to update password")
        toast({
          title: "Error",
          description: data.error || "Failed to update password",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating password:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsChangingPassword(false)
    }
  }

  // Handle profile picture upload
  const handleProfilePictureUpload = async (url: string) => {
    try {
      // Update local state immediately for instant UI feedback
      setProfileImage(url)

      const response = await fetch("/api/settings/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: url,
        }),
      })

      if (response.ok) {
        // Also update session for UI consistency
        await updateSession({
          user: {
            ...session?.user,
            image: url,
          },
        })
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.error || "Failed to update profile picture",
          variant: "destructive",
        })
        // Revert the local state if there was an error
        await fetchUserData() // Refetch to get accurate state
      }
    } catch (error) {
      console.error("Error updating profile picture:", error)
      toast({
        title: "Error",
        description: "Failed to update profile picture",
        variant: "destructive",
      })
      // Revert the local state if there was an error
      await fetchUserData() // Refetch to get accurate state
    }
  }

  // Handle profile picture removal
  const handleProfilePictureRemove = async () => {
    try {
      // Update local state immediately for instant UI feedback
      setProfileImage(null)

      // Check if there's an image to remove
      if (!profileImage && !session?.user?.image) {
        toast({
          title: "Info",
          description: "No profile picture to remove",
        })
        return
      }

      const response = await fetch("/api/settings/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: null, // Send explicit null to indicate deletion
        }),
      })

      if (response.ok) {
        // Also update session for UI consistency
        await updateSession({
          user: {
            ...session?.user,
            image: null,
          },
        })

        toast({
          title: "Success",
          description: "Profile picture removed successfully",
        })
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.error || "Failed to remove profile picture",
          variant: "destructive",
        })
        // Revert the local state if there was an error
        await fetchUserData() // Refetch to get accurate state
      }
    } catch (error) {
      console.error("Error removing profile picture:", error)
      toast({
        title: "Error",
        description: "Failed to remove profile picture",
        variant: "destructive",
      })
      // Revert the local state if there was an error
      await fetchUserData() // Refetch to get accurate state
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Account</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="mt-6 space-y-6">
          <Suspense fallback={<ProfileSectionSkeleton />}>
            {isLoadingUserData ? (
              <ProfileSectionSkeleton />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your account profile information and email
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="space-y-4">
                      <UploadAvatar
                        userId={session?.user?.id || ""}
                        imageUrl={profileImage || session?.user?.image}
                        name={name || session?.user?.name}
                        email={email || session?.user?.email}
                        onUploadComplete={handleProfilePictureUpload}
                        onRemove={handleProfilePictureRemove}
                      />

                      <Separator />

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </Suspense>

          {/* Danger Zone */}
          <Card className="border-red-200 dark:border-red-900">
            <CardHeader>
              <CardTitle className="text-red-500">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="font-medium">Delete Account</h3>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="destructive"
                type="button"
                className="gap-2"
                disabled={isDeleting}
                onClick={() => {
                  const confirm = window.confirm(
                    "Are you sure you want to delete your account? This action cannot be undone."
                  )
                  if (confirm) {
                    setIsDeleting(true)
                    // Account deletion logic would go here
                    toast({
                      title: "Account deletion",
                      description: "This feature is not yet implemented",
                    })
                    setIsDeleting(false)
                  }
                }}
              >
                <Trash2 className="h-4 w-4" />
                {isDeleting ? "Deleting..." : "Delete Account"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure what notifications you receive
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateNotifications} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="api-usage">API Usage Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when you approach your API usage
                        limits
                      </p>
                    </div>
                    <Switch
                      id="api-usage"
                      checked={notifications.apiUsage}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          apiUsage: checked,
                        }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="security">Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about important security events like new
                        logins
                      </p>
                    </div>
                    <Switch
                      id="security"
                      checked={notifications.security}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          security: checked,
                        }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing">Marketing</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about new features and services
                      </p>
                    </div>
                    <Switch
                      id="marketing"
                      checked={notifications.marketing}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          marketing: checked,
                        }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="newsletter">Newsletter</Label>
                      <p className="text-sm text-muted-foreground">
                        Subscribe to our monthly newsletter with API tips and
                        tricks
                      </p>
                    </div>
                    <Switch
                      id="newsletter"
                      checked={notifications.newsletter}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          newsletter: checked,
                        }))
                      }
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Preferences"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 8 characters and include a
                      number
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  {passwordError && (
                    <p className="text-sm text-red-500">{passwordError}</p>
                  )}
                </div>

                <Button type="submit" disabled={isChangingPassword}>
                  {isChangingPassword ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Protect your account with a second authentication step
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Two-Factor Authentication",
                      description: "This feature is coming soon!",
                    })
                  }}
                >
                  Enable
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Active Sessions</Label>
                  <p className="text-sm text-muted-foreground">
                    Manage and view your currently active sessions
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Session Management",
                      description: "This feature is coming soon!",
                    })
                  }}
                >
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
