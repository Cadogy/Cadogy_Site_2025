"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(""); // Clear previous errors

    try {
      // Use the native `fetch` API instead of axios
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.status === 201) {
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      } else {
        setError(data.error || "An error occurred during account creation.");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row mx-auto w-full">
      {/* Left Side */}
      <div className="select-none w-full hidden md:w-1/2 bg-white/10 backdrop-blur-sm text-white md:flex flex-col justify-between p-12">
        <div>
          <Link className="text-sm text-gray-300" href="/">
            Cadogy LLC
          </Link>
        </div>
        <div>
          <p className="text-md">
            “We are committed to providing public goods that help society. Our primary fiduciary duty is to humanity.”
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full h-full md:h-auto bg-background lg:w-1/2 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          {/* Logo Section with Cipher Effect */}
          <Link
            href="/"
            className="flex items-center justify-center mb-6"
          >
            <svg
              width="48px"
              height="48px"
              viewBox="0 0 24 24"
              fill="var(--logo-fill)"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Logo SVG paths */}
              <path d="M19.4491 6.94063V9.45062C19.4491 10.1606 18.7291 10.6206 18.0591 10.3706C17.2191 10.0606 16.2891 9.94062 15.3091 10.0406C12.9291 10.3006 10.4891 12.5906 10.0891 14.9606C9.75906 16.9306 10.3891 18.7706 11.5991 20.0706C12.1491 20.6706 11.7791 21.6406 10.9691 21.7306C10.2791 21.8106 9.59906 21.7906 9.21906 21.5106L3.71906 17.4006C3.06906 16.9106 2.53906 15.8506 2.53906 15.0306V6.94063C2.53906 5.81063 3.39906 4.57063 4.44906 4.17063L9.94906 2.11062C10.5191 1.90063 11.4591 1.90063 12.0291 2.11062L17.5291 4.17063C18.5891 4.57063 19.4491 5.81063 19.4491 6.94063Z" />
              <path d="M16 11.5117C13.52 11.5117 11.5 13.5317 11.5 16.0117C11.5 18.4917 13.52 20.5117 16 20.5117C18.48 20.5117 20.5 18.4917 20.5 16.0117C20.5 13.5217 18.48 11.5117 16 11.5117Z" />
              <path d="M21 22.0009C20.73 22.0009 20.48 21.8909 20.29 21.7109C20.25 21.6609 20.2 21.6109 20.17 21.5509C20.13 21.5009 20.1 21.4409 20.08 21.3809C20.05 21.3209 20.03 21.2609 20.02 21.2009C20.01 21.1309 20 21.0709 20 21.0009C20 20.8709 20.03 20.7409 20.08 20.6209C20.13 20.4909 20.2 20.3909 20.29 20.2909C20.52 20.0609 20.87 19.9509 21.19 20.0209C21.26 20.0309 21.32 20.0509 21.38 20.0809C21.44 20.1009 21.5 20.1309 21.55 20.1709C21.61 20.2009 21.66 20.2509 21.71 20.2909C21.8 20.3909 21.87 20.4909 21.92 20.6209C21.97 20.7409 22 20.8709 22 21.0009C22 21.2609 21.89 21.5209 21.71 21.7109C21.66 21.7509 21.61 21.7909 21.55 21.8309C21.5 21.8709 21.44 21.9009 21.38 21.9209C21.32 21.9509 21.26 21.9709 21.19 21.9809C21.13 21.9909 21.06 22.0009 21 22.0009Z" />
            </svg>
          </Link>
          <h2 className="text-2xl text-gray-200 font-bold text-center mb-6">Create an account</h2>
          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-4"
              required
            />
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
              required
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mb-4"
              required
            />

            <Button type="submit" className="w-full mb-4">
              Create Account
            </Button>

            <p className="text-sm text-gray-400 text-center">
              Already have an account?{" "}
              <Link href="/signin" className="text-blue-500">
                Sign in
              </Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
