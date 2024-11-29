// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  ProfileDetails: {
    __typename: 'User' as const,
    id: 42,
  },
})
