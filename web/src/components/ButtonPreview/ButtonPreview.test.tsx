import { render } from '@redwoodjs/testing/web'

import ButtonPreview from './ButtonPreview'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ButtonPreview', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ButtonPreview />)
    }).not.toThrow()
  })
})
