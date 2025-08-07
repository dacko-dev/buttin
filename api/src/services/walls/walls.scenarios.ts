import type { Prisma, Wall } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.WallCreateArgs>({
  wall: {
    one: {
      data: {
        updatedAt: '2024-11-26T18:43:39.064Z',
        title: 'String',
        number: 9442156,
      },
    },
    two: {
      data: {
        updatedAt: '2024-11-26T18:43:39.064Z',
        title: 'String',
        number: 4585941,
      },
    },
  },
})

export type StandardScenario = ScenarioData<Wall, 'wall'>
