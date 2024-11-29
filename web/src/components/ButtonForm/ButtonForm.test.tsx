import { render } from '@redwoodjs/testing/web'

import ButtonForm from './ButtonForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ButtonForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ButtonForm />)
    }).not.toThrow()
  })
})
