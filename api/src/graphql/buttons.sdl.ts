export const schema = gql`
  type Button {
    id: String!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    expiresAt: DateTime
    title: String!
    color: String!
    backgroundColor: String!
    backgroundImg: String
    borderRadius: Int!
    borderStyle: String!
    hoverState: JSON
    clickState: JSON
    clickedState: JSON
    clickCount: Int!
    maxClicksPerDay: Int!
    maxClicksPerUser: Int!
    size: Float!
    message: String
    messageColor: String
    messageBg: String
    messageBgImg: String
    animation: JSON
    behavior: JSON
    isVisible: Boolean!
    creatorId: String!
    creator: User!
    uniqueClicks: Int!
    wallId: Int!
    wall: Wall!
    ButtonClick: [ButtonClick]!
    tags: [String]!
    Tag: Tag
    tagId: Int
  }

  type Query {
    buttons: [Button!]! @requireAuth
    button(id: String!): Button @requireAuth
  }

  input CreateButtonInput {
    name: String!
    expiresAt: DateTime
    title: String!
    color: String!
    backgroundColor: String!
    backgroundImg: String
    borderRadius: Int!
    borderStyle: String!
    hoverState: JSON
    clickState: JSON
    clickedState: JSON
    clickCount: Int!
    maxClicksPerDay: Int!
    maxClicksPerUser: Int!
    size: Float!
    message: String
    messageColor: String
    messageBg: String
    messageBgImg: String
    animation: JSON
    behavior: JSON
    isVisible: Boolean!
    creatorId: String!
    uniqueClicks: Int!
    wallId: Int!
    tags: [String]!
    tagId: Int
  }

  input UpdateButtonInput {
    name: String
    expiresAt: DateTime
    title: String
    color: String
    backgroundColor: String
    backgroundImg: String
    borderRadius: Int
    borderStyle: String
    hoverState: JSON
    clickState: JSON
    clickedState: JSON
    clickCount: Int
    maxClicksPerDay: Int
    maxClicksPerUser: Int
    size: Float
    message: String
    messageColor: String
    messageBg: String
    messageBgImg: String
    animation: JSON
    behavior: JSON
    isVisible: Boolean
    creatorId: String
    uniqueClicks: Int
    wallId: Int
    tags: [String]!
    tagId: Int
  }

  type Mutation {
    createButton(input: CreateButtonInput!): Button! @requireAuth
    updateButton(id: String!, input: UpdateButtonInput!): Button! @requireAuth
    deleteButton(id: String!): Button! @requireAuth
  }
`
