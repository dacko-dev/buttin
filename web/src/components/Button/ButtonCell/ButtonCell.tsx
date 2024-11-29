import type { FindButtonById, FindButtonByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Button from 'src/components/Button/Button'

export const QUERY: TypedDocumentNode<FindButtonById, FindButtonByIdVariables> =
  gql`
    query FindButtonById($id: String!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Button not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindButtonByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  button,
}: CellSuccessProps<FindButtonById, FindButtonByIdVariables>) => {
  return <Button button={button} />
}
