"use client"

import { useState } from "react"

export function FullWidthCTA() {
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal((prev) => !prev)
  }

  return (
    <>
      {/* Main content */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-[85rem] px-4 py-4 sm:px-6 sm:py-24 lg:px-8">
          <div className="mt-3 text-center md:mt-0">
            <h1 className="text-4xl text-gray-800 dark:text-neutral-200 sm:text-6xl">
              Ask Us Anything
            </h1>

            <p className="mt-3 text-gray-600 dark:text-neutral-400">
              Chat with the digital agents of Charles and Dylan.
            </p>

            <div className="relative mx-auto mt-3 max-w-xl sm:mt-12">
              {/* Form */}
              <form>
                <div className="relative z-10 flex gap-x-3 rounded-lg border bg-white p-2 shadow-lg shadow-gray-100 dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-gray-900/20">
                  <div className="w-full">
                    <label
                      htmlFor="hs-search-article-1"
                      className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      <span className="sr-only">What’s on your mind...</span>
                    </label>
                    <input
                      type="text"
                      name="hs-search-article-1"
                      id="hs-search-article-1"
                      className="block w-full rounded-lg border-transparent px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500 dark:border-transparent dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      placeholder="What’s on your mind..."
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={toggleModal}
                      className="inline-flex size-[46px] items-center justify-center gap-x-2 rounded-md border border-transparent bg-white/30 text-sm font-medium text-white hover:bg-white/40 focus:bg-white/50 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      <svg
                        className="size-5 shrink-0"
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
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
              {/* End Form */}

              {/* SVG Element */}
              <div className="absolute end-0 top-0 hidden -translate-y-12 translate-x-20 md:block">
                <svg
                  className="h-auto w-16 text-orange-500"
                  width="121"
                  height="135"
                  viewBox="0 0 121 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                    stroke="currentColor"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* SVG Element */}
              <div className="absolute bottom-0 start-0 hidden -translate-x-32 translate-y-10 md:block">
                <svg
                  className="h-auto w-40 text-cyan-500"
                  width="347"
                  height="188"
                  viewBox="0 0 347 188"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                    stroke="currentColor"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
          <div className="relative w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg dark:bg-neutral-900">
            <h2 className="mb-4 text-3xl font-semibold text-gray-800 dark:text-white">
              Virtual Chat Coming Soon
            </h2>
            <p className="text-md text-gray-600 dark:text-neutral-400">
              We’re building an exciting new feature where you’ll be able to
              have live conversations with digital agents representing Charles
              and Dylan. Stay tuned for more updates on this!
            </p>
            <button
              onClick={toggleModal}
              className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
