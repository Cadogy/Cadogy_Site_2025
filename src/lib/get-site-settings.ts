import { cache } from "react"
import { ISiteSettings, SiteSettings } from "@/models/SiteSettings"

import { siteConfig } from "@/config/site"
import { connectToDatabase } from "@/lib/mongodb"

export const getSiteSettings = cache(async () => {
  try {
    await connectToDatabase()

    const settings =
      (await SiteSettings.findOne().lean()) as ISiteSettings | null

    if (!settings) {
      return {
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
        registrationEnabled: true,
        maintenanceMode: false,
      }
    }

    return {
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
      registrationEnabled: settings.registrationEnabled ?? true,
      maintenanceMode: settings.maintenanceMode ?? false,
    }
  } catch (error) {
    console.error("Error fetching site settings:", error)
    return {
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
      registrationEnabled: true,
      maintenanceMode: false,
    }
  }
})
