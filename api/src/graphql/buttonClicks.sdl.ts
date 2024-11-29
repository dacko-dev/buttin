export const schema = gql`
  type ButtonClick {
    id: BigInt!
    createdAt: DateTime!
    ipAddress: String
    buttonId: String!
    button: Button!
    userId: String!
    user: User!
  }

  type Query {
    buttonClicks: [ButtonClick!]! @requireAuth
    buttonClick(id: BigInt!): ButtonClick @requireAuth
  }

  input CreateButtonClickInput {
    ipAddress: String
    buttonId: String!
    userId: String!
  }

  input UpdateButtonClickInput {
    ipAddress: String
    buttonId: String
    userId: String
  }

  type Mutation {
    createButtonClick(input: CreateButtonClickInput!): ButtonClick! @requireAuth
    updateButtonClick(
      id: BigInt!
      input: UpdateButtonClickInput!
    ): ButtonClick! @requireAuth
    deleteButtonClick(id: BigInt!): ButtonClick! @requireAuth
  }
`
