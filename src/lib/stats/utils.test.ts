import { getStatsData, validateStatData, formatStatValue } from "./utils"

describe("Stats Utils", () => {
  describe("getStatsData", () => {
    it("should return default stats configuration", () => {
      const stats = getStatsData()

      expect(stats).toHaveLength(3)
      expect(stats[0]).toEqual({
        value: "15+",
        label: "Years in Business",
        variant: "default",
      })
      expect(stats[1]).toEqual({
        value: "500+",
        label: "Projects Delivered",
        variant: "default",
      })
      expect(stats[2]).toEqual({
        value: "50+",
        label: "Technologies",
        variant: "default",
      })
    })

    it("should return stats with correct structure", () => {
      const stats = getStatsData()

      stats.forEach((stat) => {
        expect(stat).toHaveProperty("value")
        expect(stat).toHaveProperty("label")
        expect(stat).toHaveProperty("variant")
      })
    })
  })

  describe("validateStatData", () => {
    it("should validate correct stat data", () => {
      const validStat = {
        value: "15+",
        label: "Years",
        variant: "default" as const,
      }

      const result = validateStatData(validStat)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validStat)
      }
    })

    it("should accept large variant", () => {
      const validStat = {
        value: "98%",
        label: "Satisfaction",
        variant: "large" as const,
      }

      const result = validateStatData(validStat)

      expect(result.success).toBe(true)
    })

    it("should accept optional description", () => {
      const validStat = {
        value: "1000",
        label: "Clients",
        variant: "default" as const,
        description: "Happy customers worldwide",
      }

      const result = validateStatData(validStat)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.description).toBe("Happy customers worldwide")
      }
    })

    it("should reject invalid variant", () => {
      const invalidStat = {
        value: "15+",
        label: "Years",
        variant: "invalid" as any,
      }

      const result = validateStatData(invalidStat)

      expect(result.success).toBe(false)
    })

    it("should reject missing required fields", () => {
      const invalidStat = {
        value: "15+",
      }

      const result = validateStatData(invalidStat)

      expect(result.success).toBe(false)
    })

    it("should reject empty string values", () => {
      const invalidStat = {
        value: "",
        label: "Years",
        variant: "default" as const,
      }

      const result = validateStatData(invalidStat)

      expect(result.success).toBe(false)
    })
  })

  describe("formatStatValue", () => {
    it("should format numeric string with plus", () => {
      expect(formatStatValue("15")).toBe("15+")
    })

    it("should not add plus if already present", () => {
      expect(formatStatValue("15+")).toBe("15+")
    })

    it("should not add plus to percentages", () => {
      expect(formatStatValue("98%")).toBe("98%")
    })

    it("should handle values with commas", () => {
      expect(formatStatValue("1,000")).toBe("1,000+")
    })

    it("should handle already formatted values", () => {
      expect(formatStatValue("500+")).toBe("500+")
      expect(formatStatValue("98%")).toBe("98%")
    })

    it("should handle empty string", () => {
      expect(formatStatValue("")).toBe("")
    })
  })
})
