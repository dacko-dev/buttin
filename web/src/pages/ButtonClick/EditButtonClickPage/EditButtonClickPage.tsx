import EditButtonClickCell from 'src/components/ButtonClick/EditButtonClickCell'

type ButtonClickPageProps = {
  id: number
}

const EditButtonClickPage = ({ id }: ButtonClickPageProps) => {
  return <EditButtonClickCell id={id} />
}

export default EditButtonClickPage
