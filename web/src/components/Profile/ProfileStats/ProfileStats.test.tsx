import { render } from '@redwoodjs/testing/web'

import ProfileStats from './ProfileStats'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ProfileStats', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileStats />)
    }).not.toThrow()
  })
})
