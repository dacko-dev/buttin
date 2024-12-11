export const buttonStates = [
  'base',
  'hover',
  'focus',
  'active',
  'clicked',
] as const
export type ButtonStateType = (typeof buttonStates)[number]

export const buttonBackgroundTypes = ['solid', 'gradient'] as const
// type BackgroundType = (typeof buttonBackgroundTypes)[number]

export const buttonStylingTypes = ['Form', 'CSS', 'Tailwind'] as const
// type ButtonStylingType = (typeof buttonStylingTypes)[number]
export const buttonTransitionProperties = [
  'all',
  'background',
  'border',
  'color',
  'opacity',
] as const

export const buttonTextDecorationLineTypes = [
  'none',
  'underline',
  'overline',
  'line-through',
] as const

export const buttonTextDecorationStyleTypes = [
  'solid',
  'double',
  'dotted',
  'dashed',
  'wavy',
] as const

export const buttonTransitionTimingFunctions = [
  'ease',
  'linear',
  'ease-in',
  'ease-out',
  'ease-in-out',
] as const
