import type {
  CreateButtonClickMutation,
  CreateButtonClickInput,
  CreateButtonClickMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ButtonClickForm from 'src/components/ButtonClick/ButtonClickForm'

const CREATE_BUTTON_CLICK_MUTATION: TypedDocumentNode<
  CreateButtonClickMutation,
  CreateButtonClickMutationVariables
> = gql`
  mutation CreateButtonClickMutation($input: CreateButtonClickInput!) {
    createButtonClick(input: $input) {
      id
    }
  }
`

const NewButtonClick = () => {
  const [createButtonClick, { loading, error }] = useMutation(
    CREATE_BUTTON_CLICK_MUTATION,
    {
      onCompleted: () => {
        toast.success('ButtonClick created')
        navigate(routes.buttonClicks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateButtonClickInput) => {
    createButtonClick({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ButtonClick</h2>
      </header>
      <div className="rw-segment-main">
        <ButtonClickForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewButtonClick
