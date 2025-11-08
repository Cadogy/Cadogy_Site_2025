import { NextRequest, NextResponse } from "next/server"
import { ISiteSettings, SiteSettings } from "@/models/SiteSettings"
import { getServerSession } from "next-auth"

import { siteConfig } from "@/config/site"
import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized", message: "Admin access required" },
        { status: 403 }
      )
    }

    await connectToDatabase()

    let settings = await SiteSettings.findOne()

    if (!settings) {
      settings = await SiteSettings.create({
        registrationEnabled: true,
        dashboardBackgroundImage: "",
        dashboardBackgroundOpacity: 0.1,
        siteName: `${siteConfig.name}`,
        siteSlogan: siteConfig.slogan || "",
        siteDescription: siteConfig.description,
        footerDescription:
          "Crafting exceptional digital experiences through innovative web development, secure infrastructure, and custom solutions for businesses in South Florida and beyond.",
        contactEmail: "hello@cadogy.com",
        contactAddress: "Pompano Beach, FL",
        socialInstagram: "https://www.instagram.com/cadogyweb",
        socialGithub: "https://www.github.com/cadogy",
        socialLinkedin: "https://www.linkedin.com/company/cadogy",
        maintenanceMode: false,
        defaultTokenBalance: 0,
        maxFileUploadSize: 10485760,
        updatedBy: session.user.id,
      })
    } else {
      let needsUpdate = false

      if (settings.siteSlogan === undefined) {
        settings.siteSlogan = ""
        needsUpdate = true
      }
      if (!settings.footerDescription) {
        settings.footerDescription =
          "Crafting exceptional digital experiences through innovative web development, secure infrastructure, and custom solutions for businesses in South Florida and beyond."
        needsUpdate = true
      }
      if (!settings.contactEmail) {
        settings.contactEmail = "hello@cadogy.com"
        needsUpdate = true
      }
      if (!settings.contactAddress) {
        settings.contactAddress = "Pompano Beach, FL"
        needsUpdate = true
      }
      if (!settings.socialInstagram) {
        settings.socialInstagram = "https://www.instagram.com/cadogyweb"
        needsUpdate = true
      }
      if (!settings.socialGithub) {
        settings.socialGithub = "https://www.github.com/cadogy"
        needsUpdate = true
      }
      if (!settings.socialLinkedin) {
        settings.socialLinkedin = "https://www.linkedin.com/company/cadogy"
        needsUpdate = true
      }

      if (needsUpdate) {
        await settings.save()
      }
    }

    settings = settings.toObject ? settings.toObject() : settings

    return NextResponse.json({
      settings: {
        id: settings._id.toString(),
        registrationEnabled: settings.registrationEnabled,
        dashboardBackgroundImage: settings.dashboardBackgroundImage || "",
        dashboardBackgroundOpacity: settings.dashboardBackgroundOpacity ?? 0.1,
        siteName: settings.siteName || "",
        siteSlogan: settings.siteSlogan || "",
        siteDescription: settings.siteDescription || "",
        footerDescription: settings.footerDescription || "",
        contactEmail: settings.contactEmail || "",
        contactAddress: settings.contactAddress || "",
        socialInstagram: settings.socialInstagram || "",
        socialGithub: settings.socialGithub || "",
        socialLinkedin: settings.socialLinkedin || "",
        maintenanceMode: settings.maintenanceMode ?? false,
        defaultTokenBalance: settings.defaultTokenBalance ?? 0,
        maxFileUploadSize: settings.maxFileUploadSize ?? 10485760,
        updatedAt: settings.updatedAt,
      },
    })
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch settings",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized", message: "Admin access required" },
        { status: 403 }
      )
    }

    await connectToDatabase()

    const body = await request.json()
    const {
      registrationEnabled,
      dashboardBackgroundImage,
      dashboardBackgroundOpacity,
      siteName,
      siteSlogan,
      siteDescription,
      footerDescription,
      contactEmail,
      contactAddress,
      socialInstagram,
      socialGithub,
      socialLinkedin,
      maintenanceMode,
      defaultTokenBalance,
      maxFileUploadSize,
    } = body

    console.log("PATCH body received:", { siteSlogan, siteName })

    const updateData: any = {
      updatedBy: session.user.id,
    }

    if (registrationEnabled !== undefined)
      updateData.registrationEnabled = registrationEnabled
    if (dashboardBackgroundImage !== undefined)
      updateData.dashboardBackgroundImage = dashboardBackgroundImage
    if (dashboardBackgroundOpacity !== undefined)
      updateData.dashboardBackgroundOpacity = dashboardBackgroundOpacity
    if (siteName !== undefined) updateData.siteName = siteName
    if (siteSlogan !== undefined) updateData.siteSlogan = siteSlogan
    if (siteDescription !== undefined)
      updateData.siteDescription = siteDescription
    if (footerDescription !== undefined)
      updateData.footerDescription = footerDescription
    if (contactEmail !== undefined) updateData.contactEmail = contactEmail
    if (contactAddress !== undefined) updateData.contactAddress = contactAddress
    if (socialInstagram !== undefined)
      updateData.socialInstagram = socialInstagram
    if (socialGithub !== undefined) updateData.socialGithub = socialGithub
    if (socialLinkedin !== undefined) updateData.socialLinkedin = socialLinkedin
    if (maintenanceMode !== undefined)
      updateData.maintenanceMode = maintenanceMode
    if (defaultTokenBalance !== undefined)
      updateData.defaultTokenBalance = defaultTokenBalance
    if (maxFileUploadSize !== undefined)
      updateData.maxFileUploadSize = maxFileUploadSize

    console.log("Update data:", { siteSlogan: updateData.siteSlogan })

    const updateResult = await SiteSettings.updateOne(
      {},
      { $set: updateData },
      { upsert: true }
    )

    console.log("Update result:", {
      matchedCount: updateResult.matchedCount,
      modifiedCount: updateResult.modifiedCount,
      upsertedCount: updateResult.upsertedCount,
    })

    const settings =
      (await SiteSettings.findOne().lean()) as ISiteSettings | null

    if (!settings) {
      return NextResponse.json(
        { error: "Settings not found after update" },
        { status: 500 }
      )
    }

    console.log("After update (refetched):", {
      siteSlogan: settings.siteSlogan,
      siteName: settings.siteName,
      updatedAt: settings.updatedAt,
    })

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
      settings: {
        id: settings._id.toString(),
        registrationEnabled: settings.registrationEnabled,
        dashboardBackgroundImage: settings.dashboardBackgroundImage || "",
        dashboardBackgroundOpacity: settings.dashboardBackgroundOpacity ?? 0.1,
        siteName: settings.siteName || "",
        siteSlogan: settings.siteSlogan || "",
        siteDescription: settings.siteDescription || "",
        footerDescription: settings.footerDescription || "",
        contactEmail: settings.contactEmail || "",
        contactAddress: settings.contactAddress || "",
        socialInstagram: settings.socialInstagram || "",
        socialGithub: settings.socialGithub || "",
        socialLinkedin: settings.socialLinkedin || "",
        maintenanceMode: settings.maintenanceMode ?? false,
        defaultTokenBalance: settings.defaultTokenBalance ?? 0,
        maxFileUploadSize: settings.maxFileUploadSize ?? 10485760,
        updatedAt: settings.updatedAt,
      },
    })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json(
      {
        error: "Failed to update settings",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
