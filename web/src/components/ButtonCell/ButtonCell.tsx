import type { FindButtonQuery, FindButtonQueryVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<
  FindButtonQuery,
  FindButtonQueryVariables
> = gql`
  query FindButtonQuery($id: String!) {
    button: button(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindButtonQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  button,
}: CellSuccessProps<FindButtonQuery, FindButtonQueryVariables>) => {
  return <div>{JSON.stringify(button)}</div>
}
