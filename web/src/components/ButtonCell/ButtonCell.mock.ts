// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  button: {
    __typename: 'Button' as const,
    id: '42',
  },
})
