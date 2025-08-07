import ButtonCell from 'src/components/Button/ButtonCell'

type ButtonPageProps = {
  id: string
}

const ButtonPage = ({ id }: ButtonPageProps) => {
  return <ButtonCell id={id} />
}

export default ButtonPage
