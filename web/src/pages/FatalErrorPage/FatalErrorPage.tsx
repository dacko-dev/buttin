// This page will be rendered when an error makes it all the way to the top of the
// application without being handled by a Javascript catch statement or React error
// boundary.
//
// You can modify this page as you wish, but it is important to keep things simple to
// avoid the possibility that it will cause its own error. If it does, Redwood will
// still render a generic error page, but your users will prefer something a bit more
// thoughtful :)

// This import will be automatically removed when building for production
import { Link, routes } from '@redwoodjs/router'
// import { DevFatalErrorPage } from '@redwoodjs/web/dist/components/DevFatalErrorPage'

// ...

const RedwoodDevFatalErrorPage = () => (
  <div className="min-h-screen bg-base-950 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
    <div className="mx-auto max-w-max">
      <main className="sm:flex">
        <p className="text-4xl font-extrabold text-blue-600 sm:text-5xl">
          🤦‍♂️ Oops.
        </p>
        <div className="sm:ml-6">
          <div className="sm:border-body-200 sm:border-l sm:pl-6">
            <h1 className="text-body-900 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Something went wrong
            </h1>
            <p className="mt-1 text-base text-neutral-500">
              Sorry about that. Please contact support for help.
            </p>
          </div>
          <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
            <Link
              to={routes.home()}
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Home
            </Link>
            <Link
              // TODO: This should link to a support page
              to={routes.home()}
              className="inline-flex items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>
    </div>
  </div>
)

export default RedwoodDevFatalErrorPage
