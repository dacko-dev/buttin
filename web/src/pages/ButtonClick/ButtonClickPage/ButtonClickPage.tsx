import ButtonClickCell from 'src/components/ButtonClick/ButtonClickCell'

type ButtonClickPageProps = {
  id: number
}

const ButtonClickPage = ({ id }: ButtonClickPageProps) => {
  return <ButtonClickCell id={id} />
}

export default ButtonClickPage
