import type { Prisma, Tag } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TagCreateArgs>({
  tag: {
    one: {
      data: { name: 'String267850', updatedAt: '2024-11-26T18:44:26.846Z' },
    },
    two: {
      data: { name: 'String2580451', updatedAt: '2024-11-26T18:44:26.846Z' },
    },
  },
})

export type StandardScenario = ScenarioData<Tag, 'tag'>
