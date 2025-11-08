"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { Loader2, Save, Upload, X } from "lucide-react"

import { UploadButton } from "@/lib/utils/uploadthing"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface Settings {
  id: string
  registrationEnabled: boolean
  dashboardBackgroundImage: string
  dashboardBackgroundOpacity: number
  siteName: string
  siteSlogan: string
  siteDescription: string
  footerDescription: string
  contactEmail: string
  contactAddress: string
  socialInstagram: string
  socialGithub: string
  socialLinkedin: string
  maintenanceMode: boolean
  defaultTokenBalance: number
  maxFileUploadSize: number
  updatedAt: string
}

export function SettingsManagement() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const { toast } = useToast()

  const fetchSettings = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/settings")

      if (!response.ok) {
        throw new Error("Failed to fetch settings")
      }

      const data = await response.json()
      setSettings(data.settings)
    } catch (err) {
      console.error("Error fetching settings:", err)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load settings",
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  const handleMigrate = async () => {
    try {
      setIsSaving(true)

      const response = await fetch("/api/admin/settings/migrate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to migrate settings")
      }

      await fetchSettings()

      toast({
        title: "Success",
        description:
          "Settings migrated successfully with default footer values",
      })
    } catch (err) {
      console.error("Error migrating settings:", err)
      toast({
        variant: "destructive",
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to migrate settings",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSave = async () => {
    if (!settings) return

    try {
      setIsSaving(true)

      const response = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Failed to update settings")
      }

      setSettings(result.settings)
      setHasChanges(false)

      toast({
        title: "Success",
        description: "Settings updated successfully",
      })
    } catch (err) {
      console.error("Error updating settings:", err)
      toast({
        variant: "destructive",
        title: "Error",
        description:
          err instanceof Error ? err.message : "Failed to update settings",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleRemoveImage = () => {
    if (settings) {
      setSettings({
        ...settings,
        dashboardBackgroundImage: "",
      })
      setHasChanges(true)
    }
  }

  const updateSetting = <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    if (settings) {
      setSettings({ ...settings, [key]: value })
      setHasChanges(true)
    }
  }

  if (isLoading || !settings) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">General Settings</h2>
            <p className="text-sm text-muted-foreground">
              Configure basic site information and behavior
            </p>
          </div>
          {hasChanges && (
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          )}
        </div>

        <Separator className="my-4" />

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name / SEO Title</Label>
            <Input
              id="siteName"
              value={settings.siteName}
              onChange={(e) => updateSetting("siteName", e.target.value)}
              placeholder="e.g., Cadogy - Web Development Experts"
            />
            <p className="text-xs text-muted-foreground">
              This appears in browser tabs, search results, and social media
              shares
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteSlogan">Site Slogan</Label>
            <Input
              id="siteSlogan"
              value={settings.siteSlogan || ""}
              onChange={(e) => updateSetting("siteSlogan", e.target.value)}
              placeholder="e.g., Building Digital Excellence"
            />
            <p className="text-xs text-muted-foreground">
              A short tagline or slogan for your brand
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site Description / SEO Meta</Label>
            <Textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => updateSetting("siteDescription", e.target.value)}
              placeholder="Enter a compelling description for search engines and social media"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Optimal length: 150-160 characters. Shows in Google search results
              and social previews.
            </p>
            <p className="text-xs text-muted-foreground">
              Current length: {settings.siteDescription.length} characters
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="registrationEnabled">
                Enable User Registration
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow new users to create accounts
              </p>
            </div>
            <Switch
              id="registrationEnabled"
              checked={settings.registrationEnabled}
              onCheckedChange={(checked) =>
                updateSetting("registrationEnabled", checked)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                Display maintenance message to non-admin users
              </p>
            </div>
            <Switch
              id="maintenanceMode"
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) =>
                updateSetting("maintenanceMode", checked)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultTokenBalance">
              Default Token Balance for New Users
            </Label>
            <Input
              id="defaultTokenBalance"
              type="number"
              min="0"
              value={settings.defaultTokenBalance}
              onChange={(e) =>
                updateSetting(
                  "defaultTokenBalance",
                  parseInt(e.target.value) || 0
                )
              }
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Footer & Contact Settings</h2>
            <p className="text-sm text-muted-foreground">
              Configure footer content and contact information
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleMigrate}
              disabled={isSaving}
              variant="outline"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Migrating...
                </>
              ) : (
                "Migrate Footer Fields"
              )}
            </Button>
            {hasChanges && (
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="footerDescription">Footer Description</Label>
            <Textarea
              id="footerDescription"
              value={settings.footerDescription || ""}
              onChange={(e) =>
                updateSetting("footerDescription", e.target.value)
              }
              placeholder="Enter footer description text"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              This appears in the footer of your website
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              id="contactEmail"
              type="email"
              value={settings.contactEmail || ""}
              onChange={(e) => updateSetting("contactEmail", e.target.value)}
              placeholder="e.g., hello@cadogy.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactAddress">Contact Address</Label>
            <Input
              id="contactAddress"
              value={settings.contactAddress || ""}
              onChange={(e) => updateSetting("contactAddress", e.target.value)}
              placeholder="e.g., Pompano Beach, FL"
            />
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Social Media Links</h3>

            <div className="space-y-2">
              <Label htmlFor="socialInstagram">Instagram URL</Label>
              <Input
                id="socialInstagram"
                value={settings.socialInstagram || ""}
                onChange={(e) =>
                  updateSetting("socialInstagram", e.target.value)
                }
                placeholder="https://www.instagram.com/yourcompany"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="socialGithub">GitHub URL</Label>
              <Input
                id="socialGithub"
                value={settings.socialGithub || ""}
                onChange={(e) => updateSetting("socialGithub", e.target.value)}
                placeholder="https://www.github.com/yourcompany"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="socialLinkedin">LinkedIn URL</Label>
              <Input
                id="socialLinkedin"
                value={settings.socialLinkedin || ""}
                onChange={(e) =>
                  updateSetting("socialLinkedin", e.target.value)
                }
                placeholder="https://www.linkedin.com/company/yourcompany"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Dashboard Appearance</h2>
          <p className="text-sm text-muted-foreground">
            Customize the dashboard background
          </p>
        </div>

        <Separator className="my-4" />

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="dashboardBackground">Background Image</Label>
            <p className="text-sm text-muted-foreground">
              Upload an image to use as the dashboard background
            </p>

            {settings.dashboardBackgroundImage ? (
              <div className="relative mt-2 overflow-hidden rounded-lg border bg-background">
                <div
                  className="relative h-48 w-full"
                  style={{
                    opacity: settings.dashboardBackgroundOpacity || 0.1,
                  }}
                >
                  <Image
                    src={settings.dashboardBackgroundImage}
                    alt="Dashboard background"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-background via-background/95 to-transparent" />
                <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute right-2 top-2 z-10"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-2 left-2 z-10 rounded-md bg-background/90 px-2 py-1 text-xs text-muted-foreground">
                  Preview with{" "}
                  {Math.round(settings.dashboardBackgroundOpacity * 100)}%
                  opacity
                </div>
              </div>
            ) : (
              <div className="mt-2 flex items-center justify-center rounded-lg border-2 border-dashed p-12">
                <p className="text-sm text-muted-foreground">
                  No background image set
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <UploadButton
                endpoint="dashboardBackground"
                onClientUploadComplete={(res) => {
                  if (res && res.length > 0 && res[0].url) {
                    if (settings) {
                      setSettings({
                        ...settings,
                        dashboardBackgroundImage: res[0].url,
                      })
                      setHasChanges(true)
                    }

                    toast({
                      title: "Upload complete",
                      description: "Background image has been uploaded.",
                    })
                  }
                }}
                onUploadError={(error: Error) => {
                  toast({
                    variant: "destructive",
                    title: "Upload failed",
                    description: error.message || "Failed to upload image",
                  })
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="backgroundOpacity">
              Background Opacity:{" "}
              {Math.round(settings.dashboardBackgroundOpacity * 100)}%
            </Label>
            <Slider
              id="backgroundOpacity"
              min={0}
              max={100}
              step={1}
              value={[settings.dashboardBackgroundOpacity * 100]}
              onValueChange={(value) =>
                updateSetting("dashboardBackgroundOpacity", value[0] / 100)
              }
            />
            <p className="text-sm text-muted-foreground">
              Adjust the opacity of the background image
            </p>
          </div>
        </div>
      </Card>

      {hasChanges && (
        <div className="sticky bottom-4 flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} size="lg">
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save All Changes
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
