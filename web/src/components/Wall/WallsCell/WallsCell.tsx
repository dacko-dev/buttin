import type { FindWalls, FindWallsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Walls from 'src/components/Wall/Walls'

export const QUERY: TypedDocumentNode<FindWalls, FindWallsVariables> = gql`
  query FindWalls {
    walls {
      id
      name
      createdAt
      updatedAt
      title
      number
      description
      maxClicks
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No walls yet.{' '}
      <Link to={routes.newWall()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindWalls>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  walls,
}: CellSuccessProps<FindWalls, FindWallsVariables>) => {
  return <Walls walls={walls} />
}
