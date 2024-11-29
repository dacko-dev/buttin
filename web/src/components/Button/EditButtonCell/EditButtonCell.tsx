import type {
  EditButtonById,
  UpdateButtonInput,
  UpdateButtonMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ButtonForm from 'src/components/Button/ButtonForm'

export const QUERY: TypedDocumentNode<EditButtonById> = gql`
  query EditButtonById($id: String!) {
    button: button(id: $id) {
      id
      name
      createdAt
      updatedAt
      expiresAt
      title
      color
      backgroundColor
      backgroundImg
      borderRadius
      borderStyle
      hoverState
      clickState
      clickedState
      clickCount
      maxClicksPerDay
      maxClicksPerUser
      size
      message
      messageColor
      messageBg
      messageBgImg
      animation
      behavior
      isVisible
      creatorId
      uniqueClicks
      wallId
      tags
      tagId
    }
  }
`

const UPDATE_BUTTON_MUTATION: TypedDocumentNode<
  EditButtonById,
  UpdateButtonMutationVariables
> = gql`
  mutation UpdateButtonMutation($id: String!, $input: UpdateButtonInput!) {
    updateButton(id: $id, input: $input) {
      id
      name
      createdAt
      updatedAt
      expiresAt
      title
      color
      backgroundColor
      backgroundImg
      borderRadius
      borderStyle
      hoverState
      clickState
      clickedState
      clickCount
      maxClicksPerDay
      maxClicksPerUser
      size
      message
      messageColor
      messageBg
      messageBgImg
      animation
      behavior
      isVisible
      creatorId
      uniqueClicks
      wallId
      tags
      tagId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ button }: CellSuccessProps<EditButtonById>) => {
  const [updateButton, { loading, error }] = useMutation(
    UPDATE_BUTTON_MUTATION,
    {
      onCompleted: () => {
        toast.success('Button updated')
        navigate(routes.buttons())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateButtonInput,
    id: EditButtonById['button']['id']
  ) => {
    updateButton({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Button {button?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ButtonForm
          button={button}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
