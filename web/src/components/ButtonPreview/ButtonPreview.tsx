import { useState } from 'react'

import root from 'react-shadow'

export default function ButtonPreview({
  children,
  style,
  buttonId = 'my-button',
}: {
  children: React.ReactNode
  style?: string
  buttonId?: string
}) {
  const [clicked, setClicked] = useState(false)

  return (
    <root.div>
      <button
        id={buttonId}
        type="button"
        className={clicked ? 'clicked' : ''}
        onClick={() => setClicked(!clicked)}
      >
        {children}
      </button>
      {style && <style>{style}</style>}
    </root.div>
  )
}
