import EditButtonCell from 'src/components/Button/EditButtonCell'

type ButtonPageProps = {
  id: string
}

const EditButtonPage = ({ id }: ButtonPageProps) => {
  return <EditButtonCell id={id} />
}

export default EditButtonPage
