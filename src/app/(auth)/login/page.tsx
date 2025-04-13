import React from "react"
import { Metadata } from "next"
import Image from "next/image"

import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: `Clients Login - Cadogy`,
  description: "",
  keywords: [],
  openGraph: {
    title: `Clients Login - Cadogy`,
    description: "",
    url: `${siteConfig.url.base}/login`,
    images: [
      {
        url: siteConfig.ogImage,
        alt: `${siteConfig.name} - Clients Login`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Clients Login - Cadogy`,
    description: "",
    images: [siteConfig.ogImage],
  },
}

const LoginPage = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Column - Login Form */}
      <div className="flex w-full flex-col items-center justify-center p-8 lg:w-2/5">
        <div className="w-full max-w-md rounded-xl bg-[#181818] p-10 shadow-lg backdrop-blur-md">
          <div className="flex flex-col items-center">
            <a href="/">
              <svg
                width="48px"
                height="48px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.4491 6.94063V9.45062C19.4491 10.1606 18.7291 10.6206 18.0591 10.3706C17.2191 10.0606 16.2891 9.94062 15.3091 10.0406C12.9291 10.3006 10.4891 12.5906 10.0891 14.9606C9.75906 16.9306 10.3891 18.7706 11.5991 20.0706C12.1491 20.6706 11.7791 21.6406 10.9691 21.7306C10.2791 21.8106 9.59906 21.7906 9.21906 21.5106L3.71906 17.4006C3.06906 16.9106 2.53906 15.8506 2.53906 15.0306V6.94063C2.53906 5.81063 3.39906 4.57063 4.44906 4.17063L9.94906 2.11062C10.5191 1.90063 11.4591 1.90063 12.0291 2.11062L17.5291 4.17063C18.5891 4.57063 19.4491 5.81063 19.4491 6.94063Z"
                  fill="#ededed"
                />
                <path
                  d="M16 11.5117C13.52 11.5117 11.5 13.5317 11.5 16.0117C11.5 18.4917 13.52 20.5117 16 20.5117C18.48 20.5117 20.5 18.4917 20.5 16.0117C20.5 13.5217 18.48 11.5117 16 11.5117Z"
                  fill="#f0f0f0"
                />
                <path
                  d="M21 22.0009C20.73 22.0009 20.48 21.8909 20.29 21.7109C20.25 21.6609 20.2 21.6109 20.17 21.5509C20.13 21.5009 20.1 21.4409 20.08 21.3809C20.05 21.3209 20.03 21.2609 20.02 21.2009C20.01 21.1309 20 21.0709 20 21.0009C20 20.8709 20.03 20.7409 20.08 20.6209C20.13 20.4909 20.2 20.3909 20.29 20.2909C20.52 20.0609 20.87 19.9509 21.19 20.0209C21.26 20.0309 21.32 20.0509 21.38 20.0809C21.44 20.1009 21.5 20.1309 21.55 20.1709C21.61 20.2009 21.66 20.2509 21.71 20.2909C21.8 20.3909 21.87 20.4909 21.92 20.6209C21.97 20.7409 22 20.8709 22 21.0009C22 21.2609 21.89 21.5209 21.71 21.7109C21.66 21.7509 21.61 21.7909 21.55 21.8309C21.5 21.8709 21.44 21.9009 21.38 21.9209C21.32 21.9509 21.26 21.9709 21.19 21.9809C21.13 21.9909 21.06 22.0009 21 22.0009Z"
                  fill="#ededed"
                />
              </svg>
            </a>
            <h1 className="mb-6 text-center text-xl">Welcome Back</h1>
          </div>

          {/* Email and Password Form */}
          <form className="space-y-4">
            <div className="relative">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-xs text-stone-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <Button type="submit" className="w-full rounded-md">
              Sign in
            </Button>
          </form>

          {/* Footer */}
          <footer className="mt-6 text-center text-sm text-slate-300">
            Dont have an account?{" "}
            <a
              href="/register"
              className="font-medium text-green-500 hover:underline"
            >
              Sign up
            </a>
          </footer>
        </div>
      </div>

      {/* Right Column - Visual Section */}
      <div className="hidden h-full lg:block lg:w-3/5">
        <div className="fixed right-0 top-0 flex h-full w-full items-center justify-center bg-background p-10 lg:w-3/5">
          {/* Background Image */}
          <div className="relative h-full w-full overflow-hidden rounded-3xl bg-white/10">
            <Image
              src="/images/assets/sound-effects.webp"
              alt="Sound Effects Library"
              layout="fill"
              objectFit="contain"
              className="scale-75 rounded-3xl"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            {/* Text Overlay */}
            <div className="absolute bottom-10 left-10 max-w-[80%] text-white">
              <div className="mb-2 text-xs uppercase text-stone-400">
                Latest updates
              </div>
              <h2 className="text-2xl xl:text-4xl">
                Building technology to help small game creators access larger
                asset collections
              </h2>
            </div>
            {/* Navigation Arrows */}
            <div className="absolute bottom-10 right-10 flex space-x-4">
              <Button variant="outline" className="h-12 w-12 rounded-md">
                {/* Left Arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Button>
              <Button variant="outline" className="h-12 w-12 rounded-md">
                {/* Right Arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
