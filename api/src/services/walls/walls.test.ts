import type { Wall } from '@prisma/client'

import { walls, wall, createWall, updateWall, deleteWall } from './walls'
import type { StandardScenario } from './walls.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('walls', () => {
  scenario('returns all walls', async (scenario: StandardScenario) => {
    const result = await walls()

    expect(result.length).toEqual(Object.keys(scenario.wall).length)
  })

  scenario('returns a single wall', async (scenario: StandardScenario) => {
    const result = await wall({ id: scenario.wall.one.id })

    expect(result).toEqual(scenario.wall.one)
  })

  scenario('creates a wall', async () => {
    const result = await createWall({
      input: {
        updatedAt: '2024-11-26T18:43:39.059Z',
        title: 'String',
        number: 8746968,
      },
    })

    expect(result.updatedAt).toEqual(new Date('2024-11-26T18:43:39.059Z'))
    expect(result.title).toEqual('String')
    expect(result.number).toEqual(8746968)
  })

  scenario('updates a wall', async (scenario: StandardScenario) => {
    const original = (await wall({ id: scenario.wall.one.id })) as Wall
    const result = await updateWall({
      id: original.id,
      input: { updatedAt: '2024-11-27T18:43:39.059Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2024-11-27T18:43:39.059Z'))
  })

  scenario('deletes a wall', async (scenario: StandardScenario) => {
    const original = (await deleteWall({ id: scenario.wall.one.id })) as Wall
    const result = await wall({ id: original.id })

    expect(result).toEqual(null)
  })
})
