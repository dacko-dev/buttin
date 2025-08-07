import WallCell from 'src/components/Wall/WallCell'

type WallPageProps = {
  id: number
}

const WallPage = ({ id }: WallPageProps) => {
  return <WallCell id={id} />
}

export default WallPage
