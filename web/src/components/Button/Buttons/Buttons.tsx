import type {
  DeleteButtonMutation,
  DeleteButtonMutationVariables,
  FindButtons,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Button/ButtonsCell'
import {
  checkboxInputTag,
  jsonTruncate,
  timeTag,
  truncate,
} from 'src/lib/formatters'

const DELETE_BUTTON_MUTATION: TypedDocumentNode<
  DeleteButtonMutation,
  DeleteButtonMutationVariables
> = gql`
  mutation DeleteButtonMutation($id: String!) {
    deleteButton(id: $id) {
      id
    }
  }
`

const ButtonsList = ({ buttons }: FindButtons) => {
  const [deleteButton] = useMutation(DELETE_BUTTON_MUTATION, {
    onCompleted: () => {
      toast.success('Button deleted')
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

  const onDeleteClick = (id: DeleteButtonMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete button ' + id + '?')) {
      deleteButton({ variables: { id } })
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
            <th>Expires at</th>
            <th>Title</th>
            <th>Color</th>
            <th>Background color</th>
            <th>Background img</th>
            <th>Border radius</th>
            <th>Border style</th>
            <th>Hover state</th>
            <th>Click state</th>
            <th>Clicked state</th>
            <th>Click count</th>
            <th>Max clicks per day</th>
            <th>Max clicks per user</th>
            <th>Size</th>
            <th>Message</th>
            <th>Message color</th>
            <th>Message bg</th>
            <th>Message bg img</th>
            <th>Animation</th>
            <th>Behavior</th>
            <th>Is visible</th>
            <th>Creator id</th>
            <th>Unique clicks</th>
            <th>Wall id</th>
            <th>Tags</th>
            <th>Tag id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {buttons.map((button) => (
            <tr key={button.id}>
              <td>{truncate(button.id)}</td>
              <td>{truncate(button.name)}</td>
              <td>{timeTag(button.createdAt)}</td>
              <td>{timeTag(button.updatedAt)}</td>
              <td>{timeTag(button.expiresAt)}</td>
              <td>{truncate(button.title)}</td>
              <td>{truncate(button.color)}</td>
              <td>{truncate(button.backgroundColor)}</td>
              <td>{truncate(button.backgroundImg)}</td>
              <td>{truncate(button.borderRadius)}</td>
              <td>{truncate(button.borderStyle)}</td>
              <td>{jsonTruncate(button.hoverState)}</td>
              <td>{jsonTruncate(button.clickState)}</td>
              <td>{jsonTruncate(button.clickedState)}</td>
              <td>{truncate(button.clickCount)}</td>
              <td>{truncate(button.maxClicksPerDay)}</td>
              <td>{truncate(button.maxClicksPerUser)}</td>
              <td>{truncate(button.size)}</td>
              <td>{truncate(button.message)}</td>
              <td>{truncate(button.messageColor)}</td>
              <td>{truncate(button.messageBg)}</td>
              <td>{truncate(button.messageBgImg)}</td>
              <td>{jsonTruncate(button.animation)}</td>
              <td>{jsonTruncate(button.behavior)}</td>
              <td>{checkboxInputTag(button.isVisible)}</td>
              <td>{truncate(button.creatorId)}</td>
              <td>{truncate(button.uniqueClicks)}</td>
              <td>{truncate(button.wallId)}</td>
              <td>{truncate(button.tags)}</td>
              <td>{truncate(button.tagId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.button({ id: button.id })}
                    title={'Show button ' + button.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editButton({ id: button.id })}
                    title={'Edit button ' + button.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete button ' + button.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(button.id)}
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

export default ButtonsList
