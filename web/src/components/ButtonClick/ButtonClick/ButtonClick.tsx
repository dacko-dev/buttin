import type {
  DeleteButtonClickMutation,
  DeleteButtonClickMutationVariables,
  FindButtonClickById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

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

interface Props {
  buttonClick: NonNullable<FindButtonClickById['buttonClick']>
}

const ButtonClick = ({ buttonClick }: Props) => {
  const [deleteButtonClick] = useMutation(DELETE_BUTTON_CLICK_MUTATION, {
    onCompleted: () => {
      toast.success('ButtonClick deleted')
      navigate(routes.buttonClicks())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteButtonClickMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete buttonClick ' + id + '?')) {
      deleteButtonClick({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ButtonClick {buttonClick.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{buttonClick.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(buttonClick.createdAt)}</td>
            </tr>
            <tr>
              <th>Ip address</th>
              <td>{buttonClick.ipAddress}</td>
            </tr>
            <tr>
              <th>Button id</th>
              <td>{buttonClick.buttonId}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{buttonClick.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editButtonClick({ id: buttonClick.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(buttonClick.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default ButtonClick
