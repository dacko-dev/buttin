import type { Prisma, ButtonClick } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ButtonClickCreateArgs>({
  buttonClick: {
    one: {
      data: {
        button: {
          create: {
            name: 'String',
            updatedAt: '2024-11-26T18:44:09.977Z',
            title: 'String',
            color: 'String',
            backgroundColor: 'String',
            tags: 'String',
            creator: {
              create: {
                email: 'String1957135',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
            wall: {
              create: {
                updatedAt: '2024-11-26T18:44:09.977Z',
                title: 'String',
                number: 5670544,
              },
            },
          },
        },
        user: {
          create: {
            email: 'String4150196',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        button: {
          create: {
            name: 'String',
            updatedAt: '2024-11-26T18:44:09.977Z',
            title: 'String',
            color: 'String',
            backgroundColor: 'String',
            tags: 'String',
            creator: {
              create: {
                email: 'String2562895',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
            wall: {
              create: {
                updatedAt: '2024-11-26T18:44:09.977Z',
                title: 'String',
                number: 7588629,
              },
            },
          },
        },
        user: {
          create: {
            email: 'String6332327',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<ButtonClick, 'buttonClick'>
