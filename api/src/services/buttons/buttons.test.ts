import type { Button } from '@prisma/client'

import {
  buttons,
  button,
  createButton,
  updateButton,
  deleteButton,
} from './buttons'
import type { StandardScenario } from './buttons.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('buttons', () => {
  scenario('returns all buttons', async (scenario: StandardScenario) => {
    const result = await buttons()

    expect(result.length).toEqual(Object.keys(scenario.button).length)
  })

  scenario('returns a single button', async (scenario: StandardScenario) => {
    const result = await button({ id: scenario.button.one.id })

    expect(result).toEqual(scenario.button.one)
  })

  scenario('creates a button', async (scenario: StandardScenario) => {
    const result = await createButton({
      input: {
        name: 'String',
        updatedAt: '2024-11-26T18:43:25.401Z',
        title: 'String',
        color: 'String',
        backgroundColor: 'String',
        creatorId: scenario.button.two.creatorId,
        wallId: scenario.button.two.wallId,
        tags: 'String',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2024-11-26T18:43:25.401Z'))
    expect(result.title).toEqual('String')
    expect(result.color).toEqual('String')
    expect(result.backgroundColor).toEqual('String')
    expect(result.creatorId).toEqual(scenario.button.two.creatorId)
    expect(result.wallId).toEqual(scenario.button.two.wallId)
    expect(result.tags).toEqual('String')
  })

  scenario('updates a button', async (scenario: StandardScenario) => {
    const original = (await button({ id: scenario.button.one.id })) as Button
    const result = await updateButton({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a button', async (scenario: StandardScenario) => {
    const original = (await deleteButton({
      id: scenario.button.one.id,
    })) as Button
    const result = await button({ id: original.id })

    expect(result).toEqual(null)
  })
})
