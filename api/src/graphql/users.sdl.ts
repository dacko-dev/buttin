export const schema = gql`
  type User {
    id: String!
    displayName: String
    email: String!
    avatarUrl: String
    bio: String
    birthday: DateTime
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    Button: [Button]!
    ButtonClick: [ButtonClick]!
    Audit: [Audit]!
  }

  type UserProfile {
    id: String!
    displayName: String
    email: String!
    avatarUrl: String
    bio: String
    birthday: DateTime
    # Button: [Button]!
    # ButtonClick: [ButtonClick]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
    userProfiles: [UserProfile!]! @requireAuth
    userProfile(id: String!): UserProfile @requireAuth
  }

  input CreateUserInput {
    displayName: String
    email: String!
    avatarUrl: String
    bio: String
    birthday: DateTime
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  input UpdateUserInput {
    displayName: String
    email: String
    avatarUrl: String
    bio: String
    birthday: DateTime
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
    emailUser(id: String!): User! @requireAuth
  }
`
