import { CaseStudyCardProps } from "@/components/case-studies/CaseStudyCard"

export const CASE_STUDIES: CaseStudyCardProps[] = [
  {
    title: "E-Commerce Transformation",
    description:
      "Modernized online shopping platform with seamless checkout and personalized recommendations",
    image: "/images/case-studies/ecommerce.jpg",
    metrics: [
      { label: "Revenue Increase", value: "150%" },
      { label: "New Users", value: "25K+" },
      { label: "Conversion Rate", value: "4.2%" },
    ],
    link: "/articles",
  },
  {
    title: "Healthcare Portal",
    description:
      "Patient management system with secure data handling and intuitive interface",
    image: "/images/case-studies/healthcare.jpg",
    metrics: [
      { label: "Time Saved", value: "60%" },
      { label: "Users", value: "10K+" },
      { label: "Satisfaction", value: "98%" },
    ],
    link: "/articles",
  },
  {
    title: "FinTech Platform",
    description:
      "Real-time financial analytics with AI-powered insights and automated reporting",
    image: "/images/case-studies/fintech.jpg",
    metrics: [
      { label: "Processing Speed", value: "10x" },
      { label: "Transactions", value: "1M+" },
      { label: "Accuracy", value: "99.9%" },
    ],
    link: "/articles",
  },
]
