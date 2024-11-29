import { render } from '@redwoodjs/testing/web'

import ProfileButtons from './ProfileButtons'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ProfileButtons', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileButtons />)
    }).not.toThrow()
  })
})
