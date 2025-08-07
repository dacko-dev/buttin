import React from 'react'

import { Link, routes } from '@redwoodjs/router'

export default function AuthFormContainer({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    // min-h-screen
    <div className="sm:primary-gleam-hover flex min-h-screen w-full flex-col overflow-hidden border border-base-700 bg-base-800 sm:min-h-fit sm:w-fit sm:rounded-base-big">
      <div className="relative flex w-full items-center justify-center bg-base-900 p-6">
        <header className="">
          <nav>
            <Link
              aria-label="Back to home"
              className="absolute left-10 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center sm:hidden"
              to={routes.home()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </Link>
          </nav>
          <h2 className="text-2xl font-semibold ">{title}</h2>
        </header>
      </div>
      {children}
    </div>
  )
}
