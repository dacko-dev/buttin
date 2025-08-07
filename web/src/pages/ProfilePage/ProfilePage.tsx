// import { Link, routes } from '@redwoodjs/router'

import { NavLink, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import AvatarButton from 'src/components/AvatarButton/AvatarButton'
import UserProfileCell from 'src/components/UserProfileCell'

const navTabs = [
  { name: 'Profile', to: routes.profile({ tab: 'details' }) },
  { name: 'Buttons', to: routes.profile({ tab: 'buttons' }) },
  { name: 'Stats', to: routes.profile({ tab: 'stats' }) },
  { name: 'Settings', to: routes.profile({ tab: 'settings' }) },
]

interface Props {
  tab: string
}

const ProfilePage = ({ tab }: Props) => {
  const { currentUser } = useAuth()
  // const { sort } = useParams()

  console.log('tab', tab)

  return (
    <>
      <Metadata title="Profile" description="Profile page" />

      <div className="primary-gleam-hover md:rounded-base-big mt-12 rounded-none border border-base-700 bg-base-900">
        <div className="md:rounded-t-base-big flex items-center gap-4 rounded-none bg-base-950 p-6">
          <AvatarButton className="h-20 w-20" {...currentUser} />
          <div className="flex flex-col">
            {currentUser.displayName ? (
              <h1 className="text-3xl font-semibold">
                {currentUser.displayName}
              </h1>
            ) : null}
            <h2>{currentUser.email}</h2>
          </div>
        </div>
        <nav className="flex divide-base-700 border-y-1 border-base-700 bg-base-950">
          {navTabs.map((tab) => (
            <NavTab key={tab.to} {...tab} />
          ))}
        </nav>
        <div className="p-6">
          {tab === 'details' && <UserProfileCell id={currentUser.id} />}
          {tab === 'buttons' && <div>Buttons</div>}
          {tab === 'stats' && <div>Stats</div>}
          {tab === 'settings' && <div>Settings</div>}
        </div>
      </div>
    </>
  )
}

export default ProfilePage

// const profileNavTabClass = clsx(
//   'flex items-center justify-center border-r-1 border-base-700 bg-base-900 px-4 py-2 text-base font-semibold text-neutral-300 hover:bg-primary-900 hover:text-neutral-100'
// )

const NavTab = ({ name, to }) => {
  return (
    <NavLink
      activeClassName={`nav-tab nav-tab-active`}
      to={to}
      className="nav-tab"
    >
      {name}
    </NavLink>
  )
}
