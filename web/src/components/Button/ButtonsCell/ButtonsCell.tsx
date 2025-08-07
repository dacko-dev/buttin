import type { FindButtons, FindButtonsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Buttons from 'src/components/Button/Buttons'

export const QUERY: TypedDocumentNode<FindButtons, FindButtonsVariables> = gql`
  query FindButtons {
    buttons {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No buttons yet.{' '}
      <Link to={routes.newButton()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindButtons>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  buttons,
}: CellSuccessProps<FindButtons, FindButtonsVariables>) => {
  return <Buttons buttons={buttons} />
}
