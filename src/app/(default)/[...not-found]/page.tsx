// src/app/404/page.tsx
import Link from "next/link"

export default function Custom404() {
  return (
    <div className="my-48 flex select-none flex-col items-center justify-center bg-background text-white">
      <h1 className="text-4xl text-red-200">404</h1>
      <h1 className="text-4xl">Page Not Found</h1>
      <p className="mt-3 text-sm text-slate-300">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        className="duration-350 mt-6 flex items-center rounded-md border border-white/10 px-4 py-2 text-sm text-gray-200 transition hover:border-white/20 hover:text-gray-100 active:scale-95"
        href="/"
      >
        Go back home
      </Link>
    </div>
  )
}
