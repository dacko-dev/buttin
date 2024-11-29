import type { Meta, StoryObj } from '@storybook/react'

import AddButtonPage from './AddButtonPage'

const meta: Meta<typeof AddButtonPage> = {
  component: AddButtonPage,
}

export default meta

type Story = StoryObj<typeof AddButtonPage>

export const Primary: Story = {}
