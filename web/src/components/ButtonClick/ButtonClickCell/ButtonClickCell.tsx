import type {
  FindButtonClickById,
  FindButtonClickByIdVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import ButtonClick from 'src/components/ButtonClick/ButtonClick'

export const QUERY: TypedDocumentNode<
  FindButtonClickById,
  FindButtonClickByIdVariables
> = gql`
  query FindButtonClickById($id: BigInt!) {
    buttonClick: buttonClick(id: $id) {
      id
      createdAt
      ipAddress
      buttonId
      userId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ButtonClick not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindButtonClickByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  buttonClick,
}: CellSuccessProps<FindButtonClickById, FindButtonClickByIdVariables>) => {
  return <ButtonClick buttonClick={buttonClick} />
}
