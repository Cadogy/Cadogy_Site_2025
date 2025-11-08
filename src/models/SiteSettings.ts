import mongoose, { model, models, Schema } from "mongoose"

export interface ISiteSettings {
  _id?: any
  registrationEnabled: boolean
  dashboardBackgroundImage?: string
  dashboardBackgroundOpacity: number
  siteName: string
  siteSlogan?: string
  siteDescription?: string
  footerDescription?: string
  contactEmail?: string
  contactAddress?: string
  socialInstagram?: string
  socialGithub?: string
  socialLinkedin?: string
  maintenanceMode: boolean
  defaultTokenBalance: number
  maxFileUploadSize: number
  updatedAt: Date
  updatedBy: string
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    registrationEnabled: {
      type: Boolean,
      default: true,
    },
    dashboardBackgroundImage: {
      type: String,
      default: "",
    },
    dashboardBackgroundOpacity: {
      type: Number,
      default: 0.1,
      min: 0,
      max: 1,
    },
    siteName: {
      type: String,
      default: "Cadogy",
    },
    siteSlogan: {
      type: String,
      default: "",
    },
    siteDescription: {
      type: String,
      default: "",
    },
    footerDescription: {
      type: String,
      default:
        "Crafting exceptional digital experiences through innovative web development, secure infrastructure, and custom solutions for businesses in South Florida and beyond.",
    },
    contactEmail: {
      type: String,
      default: "hello@cadogy.com",
    },
    contactAddress: {
      type: String,
      default: "Pompano Beach, FL",
    },
    socialInstagram: {
      type: String,
      default: "https://www.instagram.com/cadogyweb",
    },
    socialGithub: {
      type: String,
      default: "https://www.github.com/cadogy",
    },
    socialLinkedin: {
      type: String,
      default: "https://www.linkedin.com/company/cadogy",
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    defaultTokenBalance: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxFileUploadSize: {
      type: Number,
      default: 10485760,
    },
    updatedBy: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const SiteSettings =
  models.SiteSettings ||
  model<ISiteSettings>("SiteSettings", SiteSettingsSchema)
