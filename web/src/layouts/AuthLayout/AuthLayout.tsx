import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type AuthLayoutProps = {
  children?: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="relative flex min-h-screen items-center justify-center">
      <Toaster
        toastOptions={{
          className: 'rw-toast',
          duration: 3000,
          position: 'bottom-right',
        }}
      />
      <nav className="absolute left-10 top-10 hidden sm:block">
        <Link
          aria-label="Back to home"
          className="flex rounded-base-big p-4 hover:bg-base-900"
          to={routes.home()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
              clipRule="evenodd"
            />
          </svg>

          {/* <span className="">Back</span> */}
        </Link>
      </nav>
      {children}
    </main>
  )
}

export default AuthLayout
