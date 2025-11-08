import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"
import { SiteSettings } from "@/models/SiteSettings"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized", message: "Admin access required" },
        { status: 403 }
      )
    }

    await connectToDatabase()

    const settings = await SiteSettings.findOne()

    if (!settings) {
      return NextResponse.json(
        { error: "No settings found to migrate" },
        { status: 404 }
      )
    }

    if (settings.siteSlogan === undefined) {
      settings.siteSlogan = ""
    }
    if (!settings.footerDescription) {
      settings.footerDescription = "Crafting exceptional digital experiences through innovative web development, secure infrastructure, and custom solutions for businesses in South Florida and beyond."
    }
    if (!settings.contactEmail) {
      settings.contactEmail = "hello@cadogy.com"
    }
    if (!settings.contactAddress) {
      settings.contactAddress = "Pompano Beach, FL"
    }
    if (!settings.socialInstagram) {
      settings.socialInstagram = "https://www.instagram.com/cadogyweb"
    }
    if (!settings.socialGithub) {
      settings.socialGithub = "https://www.github.com/cadogy"
    }
    if (!settings.socialLinkedin) {
      settings.socialLinkedin = "https://www.linkedin.com/company/cadogy"
    }

    settings.updatedBy = session.user.id
    await settings.save()

    return NextResponse.json({
      success: true,
      message: "Settings migrated successfully",
      settings: {
        id: settings._id.toString(),
        siteSlogan: settings.siteSlogan,
        footerDescription: settings.footerDescription,
        contactEmail: settings.contactEmail,
        contactAddress: settings.contactAddress,
        socialInstagram: settings.socialInstagram,
        socialGithub: settings.socialGithub,
        socialLinkedin: settings.socialLinkedin,
      },
    })
  } catch (error) {
    console.error("Error migrating settings:", error)
    return NextResponse.json(
      {
        error: "Failed to migrate settings",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

