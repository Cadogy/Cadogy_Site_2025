import { Session } from "next-auth"

interface WelcomeCardProps {
  session: Session | null
}

export function WelcomeCard({ session }: WelcomeCardProps) {
  const userName =
    session?.user?.name || session?.user?.email?.split("@")[0] || "there"

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Welcome back, {userName}</h2>
      <p className="mt-2 text-muted-foreground">
        Here&apos;s an overview of your API usage and account information.
      </p>
    </div>
  )
}
