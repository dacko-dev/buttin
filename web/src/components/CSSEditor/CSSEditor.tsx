import React from 'react'

import { css } from '@codemirror/lang-css'
import { tags as t } from '@lezer/highlight'
import { color } from '@uiw/codemirror-extensions-color'
import { createTheme } from '@uiw/codemirror-themes'
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror'
import clsx from 'clsx'

const theme = createTheme({
  theme: 'dark',
  settings: {
    background: '#0a0a0a',
    backgroundImage: '',
    foreground: '#c084fc',

    caret: '#b3abc1',
    selection: '#c084fc25',
    selectionMatch: '#ec489a72',
    lineHighlight: '#52525221',
    gutterBackground: '#121212',
    gutterForeground: '#8a919966',
  },
  styles: [
    { tag: t.comment, color: '#525252' },
    { tag: t.variableName, color: '#0080ff' },
    { tag: [t.string, t.special(t.brace)], color: '#b58d29' },
    { tag: t.number, color: '#5c6166' },
    { tag: t.bool, color: '#5c6166' },
    { tag: t.null, color: '#5c6166' },
    { tag: t.keyword, color: '#d4d4d4' },
    { tag: t.operator, color: '#5c6166' },
    { tag: t.className, color: '#ec4899' },
    { tag: t.definition(t.typeName), color: '#5c6166' },
    { tag: t.typeName, color: '#5c6166' },
    { tag: t.angleBracket, color: '#5c6166' },
    { tag: t.tagName, color: '#5c6166' },
    { tag: t.attributeName, color: '#5c6166' },
  ],
})

export default function CSSEditor({
  className,
  onChange,
  value,
}: {
  className?: string
  onChange: (val: string, viewUpdate: ViewUpdate) => void
  value: string
}) {
  // const onChange = React.useCallback((val: string, viewUpdate: ViewUpdate) => {
  //   console.log('val:', val)
  //   console.log('viewUpdate:', viewUpdate)
  //   setValue(val)
  // }, [])

  return (
    <CodeMirror
      theme={theme}
      placeholder={'style your button with #my-button selector'}
      className={clsx(`${className} text-lg`)}
      value={value}
      // height="200px"
      minHeight="200px"
      extensions={[color, css()]}
      onChange={onChange}
    />
  )
}
