import type {
  DeleteWallMutation,
  DeleteWallMutationVariables,
  FindWalls,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Wall/WallsCell'
import { timeTag, truncate } from 'src/lib/formatters'

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

const WallsList = ({ walls }: FindWalls) => {
  const [deleteWall] = useMutation(DELETE_WALL_MUTATION, {
    onCompleted: () => {
      toast.success('Wall deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteWallMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete wall ' + id + '?')) {
      deleteWall({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Title</th>
            <th>Number</th>
            <th>Description</th>
            <th>Max clicks</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {walls.map((wall) => (
            <tr key={wall.id}>
              <td>{truncate(wall.id)}</td>
              <td>{truncate(wall.name)}</td>
              <td>{timeTag(wall.createdAt)}</td>
              <td>{timeTag(wall.updatedAt)}</td>
              <td>{truncate(wall.title)}</td>
              <td>{truncate(wall.number)}</td>
              <td>{truncate(wall.description)}</td>
              <td>{truncate(wall.maxClicks)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.wall({ id: wall.id })}
                    title={'Show wall ' + wall.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editWall({ id: wall.id })}
                    title={'Edit wall ' + wall.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete wall ' + wall.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(wall.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WallsList
