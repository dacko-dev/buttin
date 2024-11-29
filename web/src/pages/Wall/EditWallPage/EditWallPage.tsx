import EditWallCell from 'src/components/Wall/EditWallCell'

type WallPageProps = {
  id: number
}

const EditWallPage = ({ id }: WallPageProps) => {
  return <EditWallCell id={id} />
}

export default EditWallPage
