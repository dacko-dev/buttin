import AppHeader from 'src/components/layout/AppHeader/AppHeader'

type AppLayoutProps = {
  children?: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="grid-cols-app-layout grid-rows-app-layout grid min-h-screen">
      <AppHeader className="col-start-2 col-end-3" />
      <main className="col-start-2 col-end-3">{children}</main>
    </div>
  )
}

export default AppLayout
