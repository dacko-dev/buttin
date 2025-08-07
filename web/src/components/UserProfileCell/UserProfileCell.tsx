import {
  FindProfileDetailsById,
  FindProfileDetailsByIdVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import ProfileDetails from 'src/components/Profile/ProfileDetails/ProfileDetails'

export const QUERY: TypedDocumentNode<
  FindProfileDetailsById,
  FindProfileDetailsByIdVariables
> = gql`
  query FindProfileDetailsById($id: String!) {
    userProfile: userProfile(id: $id) {
      id
      displayName
      email
      avatarUrl
      bio
      birthday
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>User not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  userProfile,
}: CellSuccessProps<
  FindProfileDetailsById,
  FindProfileDetailsByIdVariables
>) => {
  return <ProfileDetails userProfile={userProfile} />
}
