import type {
  CreateButtonMutation,
  CreateButtonInput,
  CreateButtonMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ButtonForm from 'src/components/Button/ButtonForm'

const CREATE_BUTTON_MUTATION: TypedDocumentNode<
  CreateButtonMutation,
  CreateButtonMutationVariables
> = gql`
  mutation CreateButtonMutation($input: CreateButtonInput!) {
    createButton(input: $input) {
      id
    }
  }
`

const NewButton = () => {
  const [createButton, { loading, error }] = useMutation(
    CREATE_BUTTON_MUTATION,
    {
      onCompleted: () => {
        toast.success('Button created')
        navigate(routes.buttons())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateButtonInput) => {
    createButton({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Button</h2>
      </header>
      <div className="rw-segment-main">
        <ButtonForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewButton
