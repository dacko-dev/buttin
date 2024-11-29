import type { Prisma, Button } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ButtonCreateArgs>({
  button: {
    one: {
      data: {
        name: 'String',
        updatedAt: '2024-11-26T18:43:25.407Z',
        title: 'String',
        color: 'String',
        backgroundColor: 'String',
        tags: 'String',
        creator: {
          create: {
            email: 'String9066277',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        wall: {
          create: {
            updatedAt: '2024-11-26T18:43:25.407Z',
            title: 'String',
            number: 6089468,
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        updatedAt: '2024-11-26T18:43:25.407Z',
        title: 'String',
        color: 'String',
        backgroundColor: 'String',
        tags: 'String',
        creator: {
          create: {
            email: 'String671466',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        wall: {
          create: {
            updatedAt: '2024-11-26T18:43:25.407Z',
            title: 'String',
            number: 7491388,
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Button, 'button'>
