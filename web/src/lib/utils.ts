/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CSSProperties } from 'react'

import {
  ButtonFormSchema,
  ButtonStateSchema,
} from 'src/lib/schemas/buttonFormSchema'

export function debounceFn(func: Function, delay: number) {
  let timeoutId: NodeJS.Timeout
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export function convertStateToCssProperties({
  buttonState,
  transitions,
}: {
  buttonState: Partial<ButtonStateSchema>
  transitions?: Partial<ButtonFormSchema['transitions']> | undefined
}): CSSProperties {
  const gradient =
    buttonState?.backgroundType === 'gradient' &&
    buttonState?.backgroundGradientFrom &&
    buttonState?.backgroundGradientTo &&
    buttonState?.backgroundGradientAngle
      ? `linear-gradient(${buttonState?.backgroundGradientAngle}deg, ${buttonState?.backgroundGradientFrom}, ${buttonState?.backgroundGradientTo})`
      : undefined

  const background =
    gradient ||
    buttonState?.backgroundColor ||
    `url(${buttonState?.backgroundImage})`

  const textShadow = buttonState?.textShadowColor
    ? `${buttonState?.textShadowX}px ${buttonState?.textShadowY}px ${buttonState?.textShadowBlur}px ${buttonState?.textShadowColor}`
    : undefined

  const boxShadow = buttonState?.boxShadowColor
    ? `${buttonState?.boxShadowX}px ${buttonState?.boxShadowY}px ${buttonState?.boxShadowBlur}px ${buttonState?.boxShadowSpread}px ${buttonState?.boxShadowColor} ${buttonState?.boxShadowPosition}`
    : undefined

  const transitionStyles =
    transitions?.length > 0
      ? transitions
          .map(
            (transition) =>
              `${transition.property} ${transition.duration}ms ${transition.timingFunction} ${transition.delay}ms`
          )
          .join(', ')
      : undefined

  return {
    color: buttonState?.textColor,
    fontSize: buttonState?.fontSize,
    fontWeight: buttonState?.fontWeight,
    fontFamily: buttonState?.fontFamily,

    lineHeight: buttonState?.lineHeight || undefined,
    letterSpacing: buttonState?.letterSpacing || undefined,

    textShadow,

    textDecorationColor: buttonState?.textDecorationColor,
    textDecorationLine: buttonState?.textDecorationLine,
    textDecorationStyle: buttonState?.textDecorationStyle,
    textDecorationThickness: buttonState?.textDecorationThickness,

    background,
    borderWidth: buttonState?.borderWidth,
    borderRadius: buttonState?.borderRadius,
    borderColor: buttonState?.borderColor,
    borderStyle: buttonState?.borderStyle,

    boxShadow,

    paddingTop: buttonState?.paddingY || undefined,
    paddingBottom: buttonState?.paddingY || undefined,
    paddingLeft: buttonState?.paddingX || undefined,
    paddingRight: buttonState?.paddingX || undefined,

    transition: transitionStyles,
    opacity: buttonState?.opacity || undefined,
  }
}

export function convertCssPropertiesToInlineStyles(
  styles: React.CSSProperties
): string {
  return Object.entries(styles)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase() // Convert camelCase to kebab-case
      return `${cssKey}: ${value};`
    })
    .join(' ')
}

// TODO: check if works
export function sanitizeUserCSS({
  css,
  allowedSelectors = [],
  allowedProperties = [],
}: {
  css: string
  allowedSelectors?: string[]
  allowedProperties?: string[]
}): string {
  const sanitizedCSS: string[] = []

  // Regular expression to match CSS rules and selectors
  const cssRuleRegex =
    /([#.]?[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]+)?(?::[a-z]+)?)(\s*{[^}]*})/g

  let match

  while ((match = cssRuleRegex.exec(css)) !== null) {
    const [fullMatch, selector, rules] = match

    // Check if the selector is valid (only if it is in the allowed selectors)
    const isAllowedSelector =
      allowedSelectors.length === 0 ||
      allowedSelectors.includes(selector) ||
      !selector.includes('*') // Exclude universal selector * { display: none; }

    // Only process valid selectors
    if (isAllowedSelector) {
      // Process the rules block
      const sanitizedRules = rules
        .slice(1, -1) // Remove `{` and `}`
        .split(';')
        .map((rule) => rule.trim()) // Clean up whitespace
        .filter(Boolean) // Exclude empty rules
        .map((rule) => {
          const [property, value] = rule.split(':').map((item) => item.trim())

          // Allow all properties if no filter is provided
          if (
            allowedProperties.length === 0 ||
            allowedProperties.includes(property)
          ) {
            return `${property}: ${value};`
          }
          return null // Exclude disallowed properties
        })
        .filter(Boolean) // Exclude null values
        .join(' ')

      // Add the sanitized selector and rules if valid
      if (sanitizedRules) {
        sanitizedCSS.push(`${selector} { ${sanitizedRules} }`)
      }
    }
  }

  return sanitizedCSS.join('\n')
}

// export function sanitizeUserCSS(
//   css: string,
//   allowedProperties?: string[]
// ): string {
//   const allowedSelectors = [
//     '', // Base selector
//     ':hover',
//     ':focus',
//     ':active',
//     '.clicked',
//   ]

//   const sanitizedCSS: string[] = []

//   // Regular expression to match CSS rules
//   const cssRuleRegex =
//     /([#.]?[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]+)?(?::[a-z]+)?)(\s*{[^}]*})/g
//   let match

//   while ((match = cssRuleRegex.exec(css)) !== null) {
//     const [fullMatch, selector, rules] = match

//     // Check if the selector ends with an allowed pseudo-class or additional class
//     const isAllowedSelector = allowedSelectors.some((allowed) =>
//       selector.endsWith(allowed)
//     )

//     if (isAllowedSelector) {
//       // Sanitize the rules block
//       const sanitizedRules = rules
//         .slice(1, -1) // Remove `{` and `}`
//         .split(';')
//         .map((rule) => rule.trim())
//         .filter(Boolean)
//         .map((rule) => {
//           const [property, value] = rule.split(':').map((item) => item.trim())
//           // Allow all properties if no filter is provided
//           if (!allowedProperties || allowedProperties.includes(property)) {
//             return `${property}: ${value};`
//           }
//           return null
//         })
//         .filter(Boolean)
//         .join(' ')

//       if (sanitizedRules) {
//         sanitizedCSS.push(`${selector} { ${sanitizedRules} }`)
//       }
//     }
//   }

//   return sanitizedCSS.join('\n')
// }

export function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s*([{}:;,])\s*/g, '$1') // Remove spaces around {}, :, ;, and ,
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .replace(/;}/g, '}') // Remove unnecessary semicolons before }
    .trim() // Trim leading and trailing whitespace
}
