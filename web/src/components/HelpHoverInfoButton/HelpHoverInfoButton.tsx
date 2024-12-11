export function HelpHoverInfoButton({
  children,
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="relative flex items-center justify-center">
      <button
        aria-label="Info"
        type="button"
        className="peer flex rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
          />
        </svg>
      </button>

      <div className="absolute bottom-10 z-10 hidden min-w-72 -translate-x-1/2 transform rounded-base-big border-1 border-base-700 bg-base-800 p-4 font-medium peer-hover:block md:min-w-96 ">
        <p>{children}</p>
      </div>
    </div>
  )
}
