import type {
  CreateWallMutation,
  CreateWallInput,
  CreateWallMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import WallForm from 'src/components/Wall/WallForm'

const CREATE_WALL_MUTATION: TypedDocumentNode<
  CreateWallMutation,
  CreateWallMutationVariables
> = gql`
  mutation CreateWallMutation($input: CreateWallInput!) {
    createWall(input: $input) {
      id
    }
  }
`

const NewWall = () => {
  const [createWall, { loading, error }] = useMutation(CREATE_WALL_MUTATION, {
    onCompleted: () => {
      toast.success('Wall created')
      navigate(routes.walls())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateWallInput) => {
    createWall({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Wall</h2>
      </header>
      <div className="rw-segment-main">
        <WallForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewWall
