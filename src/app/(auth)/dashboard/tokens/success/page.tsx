"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useUserData } from "@/providers/UserDataProvider"
import { CheckCircle, Coins, Loader2 } from "lucide-react"

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

export default function TokenPurchaseSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { refreshUserData } = useUserData()
  const [isLoading, setIsLoading] = useState(true)
  const [purchaseDetails, setPurchaseDetails] = useState<{
    success: boolean
    sessionId?: string
    tokens?: number
    error?: string
  }>({
    success: false,
  })

  // Get the session ID from the URL
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    if (!sessionId) {
      // No session ID, redirect to tokens page
      router.push("/dashboard/tokens")
      return
    }

    const verifyPayment = async () => {
      try {
        setIsLoading(true)

        // Verify the payment with the server
        const response = await fetch(
          `/api/payments/verify?session_id=${sessionId}`
        )
        const data = await response.json()

        if (response.ok) {
          setPurchaseDetails({
            success: true,
            sessionId,
            tokens: data.tokens,
          })

          // Refresh user data to get updated token balance
          refreshUserData()
        } else {
          setPurchaseDetails({
            success: false,
            sessionId,
            error: data.message || "Failed to verify payment",
          })
        }
      } catch (error) {
        console.error("Error verifying payment:", error)
        setPurchaseDetails({
          success: false,
          sessionId,
          error: "An error occurred while verifying your payment",
        })
      } finally {
        setIsLoading(false)
      }
    }

    verifyPayment()
  }, [sessionId, router, refreshUserData])

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Payment Status</h1>
        <p className="text-muted-foreground">
          Verifying your token purchase status
        </p>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
            <h2 className="text-xl font-semibold">Verifying Your Payment</h2>
            <p className="mt-2 text-center text-muted-foreground">
              Please wait while we verify your payment and update your token
              balance. This should only take a few seconds...
            </p>
          </CardContent>
        </Card>
      ) : purchaseDetails.success ? (
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-center text-2xl">
              Payment Successful
            </CardTitle>
            <CardDescription className="text-center">
              Your tokens have been added to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert>
                <Coins className="h-4 w-4" />
                <AlertTitle>Token Purchase Confirmed</AlertTitle>
                <AlertDescription>
                  {purchaseDetails.tokens?.toLocaleString()} tokens have been
                  added to your account.
                </AlertDescription>
              </Alert>

              <div className="mt-6 rounded-md border border-border p-4">
                <h3 className="mb-2 font-medium">What&apos;s Next?</h3>
                <ul className="list-inside list-disc space-y-2 text-sm">
                  <li>Your tokens are ready to use immediately</li>
                  <li>
                    You will receive a confirmation email with receipt details
                  </li>
                  <li>Use your tokens to access Cadogy API services</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
            <Button variant="outline" asChild>
              <Link href="/dashboard/tokens">Purchase More Tokens</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl text-destructive">
              Payment Verification Failed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {purchaseDetails.error ||
                  "We couldn't verify your payment at this time."}
              </AlertDescription>
            </Alert>
            <p className="mt-4 text-sm text-muted-foreground">
              If you believe this is an error and your payment was successful,
              please contact our support team with your session ID:{" "}
              <span className="font-mono">{sessionId}</span>
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard/tokens">Back to Token Purchase</Link>
            </Button>
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
