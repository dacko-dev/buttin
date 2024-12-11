import { UserProfile } from 'types/graphql'

import AvatarButton from 'src/components/AvatarButton/AvatarButton'

const ProfileDetails = ({ userProfile }: { userProfile: UserProfile }) => {
  const { displayName, email, avatarUrl, bio, birthday } = userProfile

  const [editDisplayName, setEditDisplayName] = React.useState(false)
  const [displayNameValue, setDisplayNameValue] = React.useState<
    string | null | undefined
  >(displayName)

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">{'Profile Details'}</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className={`profile-section-square flex items-start gap-4`}>
            <AvatarButton
              avatarUrl={avatarUrl}
              displayName={displayName || undefined}
              email={email}
              className="h-14 w-14 "
            />
            <div className="flex flex-grow flex-col gap-6">
              <div>
                <label
                  className="form-label flex items-center gap-2 focus:outline-none "
                  htmlFor="profile-display-name"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  Display Name
                </label>
                <div className="group flex items-center gap-1">
                  <input
                    maxLength={20}
                    readOnly={!editDisplayName}
                    placeholder="Display Name"
                    style={{ outline: 'none' }}
                    className="no-focus-outline w-min cursor-pointer bg-transparent px-2"
                    value={displayNameValue}
                    onChange={(e) => setDisplayNameValue(e.target.value)}
                    onClick={() => {
                      console.log('clicked')
                      if (!editDisplayName) {
                        setEditDisplayName(true)
                      }
                    }}
                  />
                  {!editDisplayName && (
                    <button
                      type="button"
                      aria-label="Edit Display Name"
                      onClick={() => setEditDisplayName((prev) => !prev)}
                      className="ml-2 hidden rounded-full p-1 hover:bg-base-800 group-focus-within:block group-hover:block"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                  )}
                  {editDisplayName && (
                    <div>
                      <button
                        type="button"
                        aria-label="Cancel changes"
                        onClick={() => {
                          setEditDisplayName(false)
                          setDisplayNameValue(displayName)
                        }}
                        className="ml-2 rounded-full p-1 hover:bg-base-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label="Save Display Name"
                        onClick={() => setEditDisplayName((prev) => !prev)}
                        className="ml-2 rounded-full p-1 hover:bg-base-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <p className="form-label flex items-center gap-1 focus:outline-none ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                    />
                  </svg>
                  Email
                </p>
                <p>{email}</p>
              </div>
            </div>
          </div>

          <div className={`profile-section-square`}>
            <div className="flex flex-col gap-6">
              <div className="flex w-full flex-col">
                <label
                  className="form-label flex items-center gap-1 "
                  htmlFor="profile-bio"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                  Bio
                </label>
                <textarea
                  style={{ outline: 'none' }}
                  id="profile-bio"
                  className="h-max min-h-[2ch]  resize-y bg-transparent"
                  value={bio}
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="form-label flex items-start gap-1"
                  htmlFor="profile-birthday"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
                    />
                  </svg>
                  Birthday
                </label>

                <input
                  id="profile-birthday"
                  type="date"
                  value={new Date(birthday).toISOString().split('T')[0]}
                  className="w-min bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">{'Actions'}</h3>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 rounded-base-big border border-base-700 p-2 px-4 font-medium hover:bg-base-600">
            Reset Password
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
            </svg>
          </button>
          <button className="flex items-center gap-2 rounded-base-big bg-red-800 p-2 px-4 font-medium hover:bg-red-700">
            Delete Account
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </section>
    </div>
  )
}

export default ProfileDetails
