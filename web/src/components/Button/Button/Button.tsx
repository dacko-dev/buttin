import type {
  DeleteButtonMutation,
  DeleteButtonMutationVariables,
  FindButtonById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, jsonDisplay, timeTag } from 'src/lib/formatters'

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

interface Props {
  button: NonNullable<FindButtonById['button']>
}

const Button = ({ button }: Props) => {
  const [deleteButton] = useMutation(DELETE_BUTTON_MUTATION, {
    onCompleted: () => {
      toast.success('Button deleted')
      navigate(routes.buttons())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteButtonMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete button ' + id + '?')) {
      deleteButton({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Button {button.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{button.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{button.name}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(button.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(button.updatedAt)}</td>
            </tr>
            <tr>
              <th>Expires at</th>
              <td>{timeTag(button.expiresAt)}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{button.title}</td>
            </tr>
            <tr>
              <th>Color</th>
              <td>{button.color}</td>
            </tr>
            <tr>
              <th>Background color</th>
              <td>{button.backgroundColor}</td>
            </tr>
            <tr>
              <th>Background img</th>
              <td>{button.backgroundImg}</td>
            </tr>
            <tr>
              <th>Border radius</th>
              <td>{button.borderRadius}</td>
            </tr>
            <tr>
              <th>Border style</th>
              <td>{button.borderStyle}</td>
            </tr>
            <tr>
              <th>Hover state</th>
              <td>{jsonDisplay(button.hoverState)}</td>
            </tr>
            <tr>
              <th>Click state</th>
              <td>{jsonDisplay(button.clickState)}</td>
            </tr>
            <tr>
              <th>Clicked state</th>
              <td>{jsonDisplay(button.clickedState)}</td>
            </tr>
            <tr>
              <th>Click count</th>
              <td>{button.clickCount}</td>
            </tr>
            <tr>
              <th>Max clicks per day</th>
              <td>{button.maxClicksPerDay}</td>
            </tr>
            <tr>
              <th>Max clicks per user</th>
              <td>{button.maxClicksPerUser}</td>
            </tr>
            <tr>
              <th>Size</th>
              <td>{button.size}</td>
            </tr>
            <tr>
              <th>Message</th>
              <td>{button.message}</td>
            </tr>
            <tr>
              <th>Message color</th>
              <td>{button.messageColor}</td>
            </tr>
            <tr>
              <th>Message bg</th>
              <td>{button.messageBg}</td>
            </tr>
            <tr>
              <th>Message bg img</th>
              <td>{button.messageBgImg}</td>
            </tr>
            <tr>
              <th>Animation</th>
              <td>{jsonDisplay(button.animation)}</td>
            </tr>
            <tr>
              <th>Behavior</th>
              <td>{jsonDisplay(button.behavior)}</td>
            </tr>
            <tr>
              <th>Is visible</th>
              <td>{checkboxInputTag(button.isVisible)}</td>
            </tr>
            <tr>
              <th>Creator id</th>
              <td>{button.creatorId}</td>
            </tr>
            <tr>
              <th>Unique clicks</th>
              <td>{button.uniqueClicks}</td>
            </tr>
            <tr>
              <th>Wall id</th>
              <td>{button.wallId}</td>
            </tr>
            <tr>
              <th>Tags</th>
              <td>{button.tags}</td>
            </tr>
            <tr>
              <th>Tag id</th>
              <td>{button.tagId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editButton({ id: button.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(button.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Button
