"use client"

import { useEffect, useState } from "react"
import { useUserData } from "@/providers/UserDataProvider"
import { loadStripe } from "@stripe/stripe-js"
import { AlertCircle, CreditCard, Info, ShieldCheck } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"

// Initialize Stripe with public key - should be in env variable
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)

// Token package options
const tokenPackages = [
  {
    tokens: 1000,
    price: 9.99,
    description: "Basic",
    isPopular: false,
    features: ["API access", "Basic support"],
  },
  {
    tokens: 5000,
    price: 39.99,
    description: "Standard",
    isPopular: true,
    features: ["API access", "Priority support", "Advanced analytics"],
  },
  {
    tokens: 20000,
    price: 129.99,
    description: "Pro",
    isPopular: false,
    features: [
      "API access",
      "Premium support",
      "Advanced analytics",
      "Dedicated resources",
    ],
  },
]

// Custom token selection with higher value range
const customPackage = {
  minTokens: 1000,
  maxTokens: 50000,
  basePrice: 9.99,
  pricePerThousand: 7.5,
}

export function TokenTopUpContent() {
  const { userData, refreshUserData } = useUserData()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null)
  const [customTokens, setCustomTokens] = useState([customPackage.minTokens])
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false)
  const [isCustomSelection, setIsCustomSelection] = useState(false)

  // Calculate custom package price based on token amount
  const calculateCustomPrice = (tokens: number) => {
    if (tokens <= customPackage.minTokens) return customPackage.basePrice

    const additionalThousands = (tokens - customPackage.minTokens) / 1000
    return (
      customPackage.basePrice +
      additionalThousands * customPackage.pricePerThousand
    )
  }

  // Current selection details
  const currentSelection = isCustomSelection
    ? {
        tokens: customTokens[0],
        price: calculateCustomPrice(customTokens[0]),
        description: "Custom",
        isPopular: false,
        features: ["API access", "Support based on account tier"],
      }
    : selectedPackage !== null
      ? tokenPackages[selectedPackage]
      : null

  // Handle package selection
  const handlePackageSelect = (index: number) => {
    setSelectedPackage(index)
    setIsCustomSelection(false)
  }

  // Handle custom selection
  const handleCustomSelect = () => {
    setSelectedPackage(null)
    setIsCustomSelection(true)
  }

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    setCustomTokens(value)
  }

  // Handle checkout
  const handleCheckout = async () => {
    if (!currentSelection) {
      toast({
        title: "Selection required",
        description: "Please select a token package to continue",
        variant: "destructive",
      })
      return
    }

    if (!hasAgreedToTerms) {
      toast({
        title: "Terms agreement required",
        description: "Please agree to the terms of service to continue",
        variant: "destructive",
      })
      return
    }

    try {
      setIsProcessing(true)

      // Create checkout session on server
      const response = await fetch("/api/payments/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokens: currentSelection.tokens,
          priceId: isCustomSelection ? "custom" : `pkg_${selectedPackage}`,
          amount: currentSelection.price,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to create checkout session")
      }

      const { sessionId } = await response.json()

      // Load Stripe and redirect to checkout
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error("Stripe failed to initialize")
      }

      const { error } = await stripe.redirectToCheckout({ sessionId })
      if (error) {
        throw error
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast({
        title: "Checkout failed",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Current balance display */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Current Balance</AlertTitle>
        <AlertDescription>
          You currently have {userData.tokenBalance.toLocaleString()} tokens in
          your account.
        </AlertDescription>
      </Alert>

      {/* Token package selection */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tokenPackages.map((pkg, index) => (
          <Card
            key={index}
            className={`cursor-pointer transition-all ${
              selectedPackage === index
                ? "border-primary ring-2 ring-primary/20"
                : "hover:border-primary/50 hover:shadow-md"
            }`}
            onClick={() => handlePackageSelect(index)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {pkg.description}
                {pkg.isPopular && (
                  <span className="rounded-lg bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    Popular
                  </span>
                )}
              </CardTitle>
              <CardDescription>
                {pkg.tokens.toLocaleString()} tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-3xl font-bold">${pkg.price}</div>
              <ul className="space-y-2 text-sm">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}

        {/* Custom package */}
        <Card
          className={`cursor-pointer transition-all ${
            isCustomSelection
              ? "border-primary ring-2 ring-primary/20"
              : "hover:border-primary/50 hover:shadow-md"
          }`}
          onClick={handleCustomSelect}
        >
          <CardHeader>
            <CardTitle>Custom</CardTitle>
            <CardDescription>Choose your amount</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-3xl font-bold">
              $
              {isCustomSelection
                ? calculateCustomPrice(customTokens[0]).toFixed(2)
                : "?"}
            </div>
            <div className="mb-6 space-y-6">
              <div>
                <Label htmlFor="token-amount" className="mb-2 block">
                  {customTokens[0].toLocaleString()} tokens
                </Label>
                <Slider
                  id="token-amount"
                  defaultValue={[customPackage.minTokens]}
                  max={customPackage.maxTokens}
                  min={customPackage.minTokens}
                  step={1000}
                  value={customTokens}
                  onValueChange={handleSliderChange}
                  disabled={!isCustomSelection}
                  className="my-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{customPackage.minTokens.toLocaleString()}</span>
                  <span>{customPackage.maxTokens.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Checkout section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Complete Your Purchase</CardTitle>
          <CardDescription>
            You will be redirected to Stripe for secure payment processing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Summary */}
          {currentSelection ? (
            <div className="rounded-md bg-muted p-4">
              <h3 className="mb-2 font-medium">Order Summary</h3>
              <div className="flex justify-between py-1">
                <span>Package</span>
                <span>{currentSelection.description}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Tokens</span>
                <span>{currentSelection.tokens.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t py-1">
                <span className="font-medium">Total</span>
                <span className="font-medium">
                  ${currentSelection.price.toFixed(2)}
                </span>
              </div>
            </div>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Selection Required</AlertTitle>
              <AlertDescription>
                Please select a token package above to continue.
              </AlertDescription>
            </Alert>
          )}

          {/* Terms of service */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={hasAgreedToTerms}
              onCheckedChange={(checked) =>
                setHasAgreedToTerms(checked as boolean)
              }
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the terms of service
              </label>
              <p className="text-xs text-muted-foreground">
                By checking this box, you agree to our{" "}
                <a href="/terms" className="text-primary underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-primary underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleCheckout}
            disabled={!currentSelection || !hasAgreedToTerms || isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <span className="flex items-center">
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Checkout
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Security notice */}
      <div className="rounded-md border border-muted p-4">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="h-5 w-5 text-green-500" />
          <h3 className="font-medium">Secure Checkout</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          All payments are processed securely via Stripe. Your card details are
          never stored on our servers. After purchase, tokens will be
          automatically added to your account and you will receive an email
          receipt.
        </p>
      </div>
    </div>
  )
}
