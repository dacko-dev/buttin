import type { FindButtonClicks, FindButtonClicksVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import ButtonClicks from 'src/components/ButtonClick/ButtonClicks'

export const QUERY: TypedDocumentNode<
  FindButtonClicks,
  FindButtonClicksVariables
> = gql`
  query FindButtonClicks {
    buttonClicks {
      id
      createdAt
      ipAddress
      buttonId
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No buttonClicks yet.{' '}
      <Link to={routes.newButtonClick()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindButtonClicks>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  buttonClicks,
}: CellSuccessProps<FindButtonClicks, FindButtonClicksVariables>) => {
  return <ButtonClicks buttonClicks={buttonClicks} />
}
