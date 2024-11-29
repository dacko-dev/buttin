import type {
  DeleteButtonClickMutation,
  DeleteButtonClickMutationVariables,
  FindButtonClicks,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ButtonClick/ButtonClicksCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_BUTTON_CLICK_MUTATION: TypedDocumentNode<
  DeleteButtonClickMutation,
  DeleteButtonClickMutationVariables
> = gql`
  mutation DeleteButtonClickMutation($id: BigInt!) {
    deleteButtonClick(id: $id) {
      id
    }
  }
`

const ButtonClicksList = ({ buttonClicks }: FindButtonClicks) => {
  const [deleteButtonClick] = useMutation(DELETE_BUTTON_CLICK_MUTATION, {
    onCompleted: () => {
      toast.success('ButtonClick deleted')
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

  const onDeleteClick = (id: DeleteButtonClickMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete buttonClick ' + id + '?')) {
      deleteButtonClick({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Ip address</th>
            <th>Button id</th>
            <th>User id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {buttonClicks.map((buttonClick) => (
            <tr key={buttonClick.id}>
              <td>{truncate(buttonClick.id)}</td>
              <td>{timeTag(buttonClick.createdAt)}</td>
              <td>{truncate(buttonClick.ipAddress)}</td>
              <td>{truncate(buttonClick.buttonId)}</td>
              <td>{truncate(buttonClick.userId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.buttonClick({ id: buttonClick.id })}
                    title={'Show buttonClick ' + buttonClick.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editButtonClick({ id: buttonClick.id })}
                    title={'Edit buttonClick ' + buttonClick.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete buttonClick ' + buttonClick.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(buttonClick.id)}
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

export default ButtonClicksList
