import { useState } from 'react'

import clsx from 'clsx'

import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import AvatarButton from 'src/components/AvatarButton/AvatarButton'

function AppHeader({ className }: JSX.IntrinsicElements['header']) {
  const { isAuthenticated, currentUser, loading } = useAuth()

  const [showDropdown, setShowDropdown] = useState(false)
  return (
    <header
      className={clsx`${className} primary-gleam-hover md:rounded-b-base-big flex h-16 items-center justify-between rounded-none border-1 border-t-0 border-base-700 bg-base-900 p-4  px-8`}
    >
      <h1 className="flex items-center gap-2">
        <Link to={routes.home()} className="bg-base text-2xl font-bold">
          Buttin
        </Link>
        <BigRedButton />
      </h1>
      <SearchButton />

      <nav>
        {/* animate-pulse */}
        {loading ? (
          <div className="h-10 w-10 animate-pulse rounded-full bg-base-500" />
        ) : isAuthenticated ? (
          <div className="flex items-center gap-2">
            <Link
              to={routes.addButton()}
              aria-label="Add new button"
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-transparent transition-colors duration-100 hover:border-primary-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={4}
                stroke="currentColor"
                className="size-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Link>
            <div className="group relative ">
              <AvatarButton
                onClick={() => {
                  console.log('clicked')
                  setShowDropdown((prev) => !prev)
                }}
                {...currentUser}
              />
              <AvatarButtonDropdown showDropdown={showDropdown} />
            </div>
          </div>
        ) : (
          <AuthLinks />
        )}
      </nav>
    </header>
  )
}

export default AppHeader

function SearchButton() {
  return (
    <button
      type="button"
      aria-label="Search"
      className="rounded-full border-transparent p-2 text-body hover:border-body hover:bg-base-700 "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="size-5"
      >
        <path
          fillRule="evenodd"
          d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  )
}

function BigRedButton() {
  return (
    <button title="Big Red Button" className="big-red-btn group">
      <div className="big-red-btn__content" />
    </button>
  )
}

function AuthLinks() {
  return (
    <ul className="flex items-center justify-center gap-4">
      <li>
        <Link
          className="rounded-3xl px-4 py-2 transition-colors delay-[10] hover:bg-base-800"
          to={routes.login()}
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          // className="bg-base-700 hover:bg-base-800 rounded-3xl px-4 py-2 font-semibold transition-colors delay-[10]"
          className="btn-primary px-4 py-2 font-semibold"
          to={routes.signUp()}
        >
          Sign Up
        </Link>
      </li>
    </ul>
  )
}

function AvatarButtonDropdown({ showDropdown }: { showDropdown: boolean }) {
  const { logOut } = useAuth()
  // if (!showDropdown) return null

  const DropdownLink = ({ to, children }: { to: string; children: string }) => (
    <Link
      to={to}
      className="block px-4 py-2 hover:bg-base-600 hover:text-white"
    >
      {children}
    </Link>
  )

  const dropdownLinks = [
    { name: 'Profile', to: routes.profile({ tab: 'details' }) },
    { name: 'My Buttons', to: routes.profile({ tab: 'buttons' }) },
    { name: 'Stats', to: routes.profile({ tab: 'stats' }) },
    { name: 'Settings', to: routes.profile({ tab: 'settings' }) },
  ]

  return (
    <div
      className={clsx(
        // ${showDropdown ? 'block' : 'hidden'}
        `absolute right-0 top-[100%] z-10 hidden w-44 transform overflow-hidden rounded-lg
          pt-4 shadow group-focus-within:block group-hover:block group-focus:block`
      )}
    >
      {/* <div className="w-0 h-0 ml-auto border-8 border-transparent border-b-base-700 "></div> */}
      <ul
        className="divide-y divide-base-600 overflow-hidden rounded-xl bg-base-700 py-1 text-sm "
        aria-labelledby="avatarDropdownButton"
      >
        {dropdownLinks.map((link) => (
          <li key={link.to}>
            <DropdownLink to={link.to}>{link.name}</DropdownLink>
          </li>
        ))}
        <li>
          <button
            onClick={logOut}
            className="block w-full bg-base-800 px-4 py-2 text-left font-semibold hover:bg-base-600 hover:text-white"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}
