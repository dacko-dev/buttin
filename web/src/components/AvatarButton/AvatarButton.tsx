import Avatar from 'boring-avatars'
import clsx from 'clsx'

export default function AvatarButton({
  avatarUrl,
  displayName,
  email,
  className,
  onClick,
}: {
  avatarUrl: string
  displayName: string
  email: string
  className?: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      id="avatarDropdownButton"
      onClick={onClick}
      className="flex rounded-full"
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={displayName || email}
          className={clsx('h-10 w-10 rounded-full ', className)}
        />
      ) : (
        <Avatar
          className={clsx('h-10 w-10 ', className)}
          name={email} // email is unique, and the avatar should be consistent
          variant="beam"
        />
      )}
    </button>
  )
}
