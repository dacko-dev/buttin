import type {
  EditButtonClickById,
  UpdateButtonClickInput,
  UpdateButtonClickMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ButtonClickForm from 'src/components/ButtonClick/ButtonClickForm'

export const QUERY: TypedDocumentNode<EditButtonClickById> = gql`
  query EditButtonClickById($id: BigInt!) {
    buttonClick: buttonClick(id: $id) {
      id
      createdAt
      ipAddress
      buttonId
      userId
    }
  }
`

const UPDATE_BUTTON_CLICK_MUTATION: TypedDocumentNode<
  EditButtonClickById,
  UpdateButtonClickMutationVariables
> = gql`
  mutation UpdateButtonClickMutation(
    $id: BigInt!
    $input: UpdateButtonClickInput!
  ) {
    updateButtonClick(id: $id, input: $input) {
      id
      createdAt
      ipAddress
      buttonId
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  buttonClick,
}: CellSuccessProps<EditButtonClickById>) => {
  const [updateButtonClick, { loading, error }] = useMutation(
    UPDATE_BUTTON_CLICK_MUTATION,
    {
      onCompleted: () => {
        toast.success('ButtonClick updated')
        navigate(routes.buttonClicks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateButtonClickInput,
    id: EditButtonClickById['buttonClick']['id']
  ) => {
    updateButtonClick({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ButtonClick {buttonClick?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ButtonClickForm
          buttonClick={buttonClick}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
