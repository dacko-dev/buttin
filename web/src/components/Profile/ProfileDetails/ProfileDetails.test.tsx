import { render } from '@redwoodjs/testing/web'

import ProfileDetails from './ProfileDetails'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ProfileDetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileDetails />)
    }).not.toThrow()
  })
})
