import React from 'react'

import Spinner from 'src/components/Spinner/Spinner'

export default function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-950">
      <Spinner />
    </div>
  )
}
