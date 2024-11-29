import type { ButtonClick } from '@prisma/client'

import {
  buttonClicks,
  buttonClick,
  createButtonClick,
  updateButtonClick,
  deleteButtonClick,
} from './buttonClicks'
import type { StandardScenario } from './buttonClicks.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('buttonClicks', () => {
  scenario('returns all buttonClicks', async (scenario: StandardScenario) => {
    const result = await buttonClicks()

    expect(result.length).toEqual(Object.keys(scenario.buttonClick).length)
  })

  scenario(
    'returns a single buttonClick',
    async (scenario: StandardScenario) => {
      const result = await buttonClick({ id: scenario.buttonClick.one.id })

      expect(result).toEqual(scenario.buttonClick.one)
    }
  )

  scenario('creates a buttonClick', async (scenario: StandardScenario) => {
    const result = await createButtonClick({
      input: {
        buttonId: scenario.buttonClick.two.buttonId,
        userId: scenario.buttonClick.two.userId,
      },
    })

    expect(result.buttonId).toEqual(scenario.buttonClick.two.buttonId)
    expect(result.userId).toEqual(scenario.buttonClick.two.userId)
  })

  scenario('updates a buttonClick', async (scenario: StandardScenario) => {
    const original = (await buttonClick({
      id: scenario.buttonClick.one.id,
    })) as ButtonClick
    const result = await updateButtonClick({
      id: original.id,
      input: { buttonId: scenario.buttonClick.two.buttonId },
    })

    expect(result.buttonId).toEqual(scenario.buttonClick.two.buttonId)
  })

  scenario('deletes a buttonClick', async (scenario: StandardScenario) => {
    const original = (await deleteButtonClick({
      id: scenario.buttonClick.one.id,
    })) as ButtonClick
    const result = await buttonClick({ id: original.id })

    expect(result).toEqual(null)
  })
})
