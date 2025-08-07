import { z } from 'zod'

import {
  buttonBackgroundTypes,
  buttonStylingTypes,
  buttonTextDecorationLineTypes,
  buttonTextDecorationStyleTypes,
  buttonTransitionProperties,
  buttonTransitionTimingFunctions,
} from 'src/lib/constants'

const buttonStateSchema = z.object({
  copyBaseStyles: z.boolean().default(true),
  textColor: z.string().optional(),

  textDecorationLine: z.enum(buttonTextDecorationLineTypes).default('none'),
  textDecorationColor: z.string().optional(),
  textDecorationStyle: z.enum(buttonTextDecorationStyleTypes).default('solid'),
  textDecorationThickness: z.number().optional(),

  textShadowColor: z.string().optional(),
  textShadowX: z.number().optional(),
  textShadowY: z.number().optional(),
  textShadowBlur: z.number().optional(),

  fontSize: z.number().optional(),
  fontWeight: z.number().optional().default(400),
  fontFamily: z.string().optional(),
  fontStyle: z.string().optional(),

  letterSpacing: z.number().optional(),
  lineHeight: z.number().optional(),

  backgroundImage: z.string().optional(),
  backgroundType: z
    .string()
    .default('solid')
    .refine((value) => {
      buttonBackgroundTypes.forEach((type) => {
        if (value === type) return true
      })
      return false
    }),
  backgroundColor: z.string(),
  backgroundGradientFrom: z.string(),
  backgroundGradientTo: z.string(),
  backgroundGradientAngle: z.number(),

  borderWidth: z.number(),
  borderRadius: z.number(),
  borderColor: z.string(),
  borderStyle: z.string(),

  boxShadowColor: z.string().optional(),
  boxShadowX: z.number().optional(),
  boxShadowY: z.number().optional(),
  boxShadowBlur: z.number().optional(),
  boxShadowSpread: z.number().optional(),
  boxShadowPosition: z.string().optional(),

  paddingX: z.number(),
  paddingY: z.number(),
  opacity: z
    .number()
    .default(1)
    .refine((value) => value >= 0 && value <= 1),
})

export type ButtonStateSchema = z.infer<typeof buttonStateSchema>

export const buttonSchema = z.object({
  name: z.string(),
  text: z.string().optional(),
  message: z.string().optional(),
  tags: z.array(z.string()),
  buttonStylingType: z
    .string()
    .default('Form')
    .refine((value) => {
      buttonStylingTypes.forEach((type) => {
        if (value === type) return true
      })
      return false
    }),
  base: buttonStateSchema,
  hover: buttonStateSchema,
  focus: buttonStateSchema,
  active: buttonStateSchema,
  clicked: buttonStateSchema,

  transitions: z.array(
    z.object({
      duration: z.number(),
      delay: z.number(),
      property: z.enum(buttonTransitionProperties),
      timingFunction: z.enum(buttonTransitionTimingFunctions),
    })
  ),

  cssStyles: z.string().max(1000).optional(),
})

export type ButtonFormSchema = z.infer<typeof buttonSchema>
