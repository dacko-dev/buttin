import type {
  DeleteWallMutation,
  DeleteWallMutationVariables,
  FindWallById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_WALL_MUTATION: TypedDocumentNode<
  DeleteWallMutation,
  DeleteWallMutationVariables
> = gql`
  mutation DeleteWallMutation($id: Int!) {
    deleteWall(id: $id) {
      id
    }
  }
`

interface Props {
  wall: NonNullable<FindWallById['wall']>
}

const Wall = ({ wall }: Props) => {
  const [deleteWall] = useMutation(DELETE_WALL_MUTATION, {
    onCompleted: () => {
      toast.success('Wall deleted')
      navigate(routes.walls())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteWallMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete wall ' + id + '?')) {
      deleteWall({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Wall {wall.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{wall.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{wall.name}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(wall.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(wall.updatedAt)}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{wall.title}</td>
            </tr>
            <tr>
              <th>Number</th>
              <td>{wall.number}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{wall.description}</td>
            </tr>
            <tr>
              <th>Max clicks</th>
              <td>{wall.maxClicks}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editWall({ id: wall.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(wall.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Wall
