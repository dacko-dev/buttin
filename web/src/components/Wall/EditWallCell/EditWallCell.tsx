import type {
  EditWallById,
  UpdateWallInput,
  UpdateWallMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import WallForm from 'src/components/Wall/WallForm'

export const QUERY: TypedDocumentNode<EditWallById> = gql`
  query EditWallById($id: Int!) {
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

const UPDATE_WALL_MUTATION: TypedDocumentNode<
  EditWallById,
  UpdateWallMutationVariables
> = gql`
  mutation UpdateWallMutation($id: Int!, $input: UpdateWallInput!) {
    updateWall(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ wall }: CellSuccessProps<EditWallById>) => {
  const [updateWall, { loading, error }] = useMutation(UPDATE_WALL_MUTATION, {
    onCompleted: () => {
      toast.success('Wall updated')
      navigate(routes.walls())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdateWallInput, id: EditWallById['wall']['id']) => {
    updateWall({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Wall {wall?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <WallForm wall={wall} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
