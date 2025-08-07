/* eslint-disable @typescript-eslint/no-unused-vars */
import { CSSProperties, useCallback, useMemo, useState } from 'react'

import { UseFormReturn } from '@redwoodjs/forms'

import { buttonStates, ButtonStateType } from 'src/lib/constants'
import {
  ButtonFormSchema,
  ButtonStateSchema,
} from 'src/lib/schemas/buttonFormSchema'
import {
  convertCssPropertiesToInlineStyles,
  convertStateToCssProperties,
} from 'src/lib/utils'

const ButtonPreviewForm = ({
  formMethods,
}: {
  formMethods: UseFormReturn<ButtonFormSchema>
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const [baseStyles, hoverStyles, focusStyles, activeStyles, clickedStyles] =
    formMethods.watch(buttonStates)

  const transitions = formMethods.watch('transitions')

  const message = formMethods.watch('message')

  const buttonText = formMethods.watch('text')

  const currentButtonState = useMemo(() => {
    if (isClicked) return 'clicked'
    if (isActive) return 'active'
    if (isFocused) return 'focus'
    if (isHovered) return 'hover'
    return 'base'
  }, [isClicked, isHovered, isFocused, isActive])

  const buttonStyle = useCallback(
    () =>
      buttonStylesFromState({
        base: baseStyles,
        hover: hoverStyles,
        focus: focusStyles,
        active: activeStyles,
        clicked: clickedStyles,
        currentState: currentButtonState,
        transitions,
      }),
    [
      baseStyles,
      hoverStyles,
      focusStyles,
      activeStyles,
      clickedStyles,
      currentButtonState,
      transitions,
    ]
  )()
  console.log('buttonStyle', buttonStyle)
  return (
    <>
      <style>{buttonStyle}</style>
      <button
        type="button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onClick={() => setIsClicked((prev) => !prev)}
        id="my-button"
        className={isClicked ? 'clicked' : ''}
        // style={buttonStyle}
      >
        <span>{buttonText}</span>
      </button>
    </>
  )
}

export default ButtonPreviewForm

type OptionalButtonStateSchema = Partial<ButtonStateSchema>

function buttonStylesFromState({
  base,
  hover,
  focus,
  active,
  clicked,
  currentState,
  transitions,
  buttonId = 'my-button',
}: {
  base: OptionalButtonStateSchema
  hover: OptionalButtonStateSchema
  focus: OptionalButtonStateSchema
  active: OptionalButtonStateSchema
  clicked: OptionalButtonStateSchema
  currentState: ButtonStateType
  transitions: Partial<ButtonFormSchema['transitions']>
  buttonId?: string
}): string {
  // const stateStyles = {
  //   base,
  //   hover,
  //   focus,
  //   active,
  //   clicked,
  // }

  const inlineStyles = `
      #${buttonId} {
         ${convertCssPropertiesToInlineStyles(
           convertStateToCssProperties({
             buttonState: base,
             transitions,
           })
         )}
      }
      #${buttonId}:hover, #${buttonId}.clicked:hover {
         ${convertCssPropertiesToInlineStyles(
           convertStateToCssProperties({
             buttonState: hover,
           })
         )}
      }
      #${buttonId}:focus, #${buttonId}.clicked:focus {
         ${convertCssPropertiesToInlineStyles(
           convertStateToCssProperties({
             buttonState: focus,
           })
         )}
      }
      #${buttonId}:active, #${buttonId}.clicked:active {
        ${convertCssPropertiesToInlineStyles(
          convertStateToCssProperties({
            buttonState: active,
          })
        )}
      }
      #${buttonId}.clicked {
        ${convertStateToCssProperties({
          buttonState: clicked,
        })}
      }
    `
  return inlineStyles

  // let currentStateStyles = stateStyles[currentState]

  // if (currentStateStyles.copyBaseStyles) {
  //   currentStateStyles = base
  // }

  // return convertStateToCssProperties({
  //   buttonState: currentStateStyles,
  //   transitions,
  // })
}
