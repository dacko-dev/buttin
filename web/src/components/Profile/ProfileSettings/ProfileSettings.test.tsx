import { render } from '@redwoodjs/testing/web'

import ProfileSettings from './ProfileSettings'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ProfileSettings', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileSettings />)
    }).not.toThrow()
  })
})
