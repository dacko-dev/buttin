export const schema = gql`
  type Wall {
    id: Int!
    name: String
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    number: Int!
    description: String
    maxClicks: Int!
    buttons: [Button]!
  }

  type Query {
    walls: [Wall!]! @requireAuth
    wall(id: Int!): Wall @requireAuth
  }

  input CreateWallInput {
    name: String
    title: String!
    number: Int!
    description: String
    maxClicks: Int!
  }

  input UpdateWallInput {
    name: String
    title: String
    number: Int
    description: String
    maxClicks: Int
  }

  type Mutation {
    createWall(input: CreateWallInput!): Wall! @requireAuth
    updateWall(id: Int!, input: UpdateWallInput!): Wall! @requireAuth
    deleteWall(id: Int!): Wall! @requireAuth
  }
`
