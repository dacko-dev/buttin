import type { FindWallById, FindWallByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Wall from 'src/components/Wall/Wall'

export const QUERY: TypedDocumentNode<FindWallById, FindWallByIdVariables> =
  gql`
    query FindWallById($id: Int!) {
      wall: wall(id: $id) {
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

export const Empty = () => <div>Wall not found</div>

export const Failure = ({ error }: CellFailureProps<FindWallByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  wall,
}: CellSuccessProps<FindWallById, FindWallByIdVariables>) => {
  return <Wall wall={wall} />
}
