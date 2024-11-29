import React from 'react'

export default function FormContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden rounded-base-big border-base-600 bg-base-800 shadow-sm shadow-base-200">
      {children}
    </div>
  )
}
