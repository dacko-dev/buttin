// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import ProfileDetails from './ProfileDetails'

const meta: Meta<typeof ProfileDetails> = {
  component: ProfileDetails,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ProfileDetails>

export const Primary: Story = {}
