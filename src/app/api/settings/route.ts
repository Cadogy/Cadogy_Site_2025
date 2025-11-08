import { NextRequest, NextResponse } from "next/server"
import { ISiteSettings, SiteSettings } from "@/models/SiteSettings"

import { siteConfig } from "@/config/site"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    const settings =
      (await SiteSettings.findOne().lean()) as ISiteSettings | null

    if (!settings) {
      return NextResponse.json({
        settings: {
          registrationEnabled: true,
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
        },
      })
    }

    return NextResponse.json({
      settings: {
        registrationEnabled: settings.registrationEnabled ?? true,
        siteName: settings.siteName || `${siteConfig.name}`,
        siteSlogan: settings.siteSlogan || siteConfig.slogan || "",
        siteDescription: settings.siteDescription || siteConfig.description,
        footerDescription:
          settings.footerDescription ||
          "Crafting exceptional digital experiences through innovative web development, secure infrastructure, and custom solutions for businesses in South Florida and beyond.",
        contactEmail: settings.contactEmail || "hello@cadogy.com",
        contactAddress: settings.contactAddress || "Pompano Beach, FL",
        socialInstagram:
          settings.socialInstagram || "https://www.instagram.com/cadogyweb",
        socialGithub: settings.socialGithub || "https://www.github.com/cadogy",
        socialLinkedin:
          settings.socialLinkedin || "https://www.linkedin.com/company/cadogy",
        maintenanceMode: settings.maintenanceMode ?? false,
        dashboardBackgroundImage: settings.dashboardBackgroundImage || "",
        dashboardBackgroundOpacity: settings.dashboardBackgroundOpacity || 0.1,
      },
    })
  } catch (error) {
    console.error("Error fetching public settings:", error)
    return NextResponse.json(
      {
        settings: {
          registrationEnabled: true,
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
        },
      },
      { status: 200 }
    )
  }
}
