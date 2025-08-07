/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'

import { UseFormReturn } from '@redwoodjs/forms'

import { ButtonFormSchema } from 'src/lib/schemas/buttonFormSchema'
import { minifyCSS, sanitizeUserCSS } from 'src/lib/utils'

const ButtonPreviewCss = ({
  formMethods,
  buttonId = 'my-button',
}: {
  formMethods: UseFormReturn<ButtonFormSchema>
  buttonId?: string
}) => {
  const [clicked, setClicked] = useState(false)
  const cssStyles = formMethods.watch('cssStyles')
  const sanitisedCssStyles = sanitizeUserCSS({
    css: cssStyles,
    allowedSelectors: [
      '#my-button',
      '#my-button:hover',
      '#my-button:gocus',
      '#my-button:active',
      '#my-button.clicked',
    ],
  })

  console.log('sanitisedCssStyles', sanitisedCssStyles)
  return (
    <>
      <style>{cssStyles}</style>

      <button
        onClick={() => setClicked(!clicked)}
        className={clicked ? 'clicked' : ''}
        type="button"
        id={buttonId}
      >
        <span>Button</span>
      </button>
    </>
  )
}

export default ButtonPreviewCss
