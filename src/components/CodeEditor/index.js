import React, { useState, useCallback, useEffect } from 'react'
import { TextArea } from '../'
import Prism from 'prismjs'
import './index.css'

const CodeEditor = ({ language = 'javascript', onChange, ...props }) => {
  const [value, setValue] = useState(props.value)

  const handleKeyDown = evt => {
    let newValue = value,
      selStartPos = evt.currentTarget.selectionStart

    // handle 4-space indent on
    if (evt.key === 'Tab') {
      newValue =
        newValue.substring(0, selStartPos) +
        '    ' +
        newValue.substring(selStartPos, newValue.length)
      evt.currentTarget.selectionStart = selStartPos + 3
      evt.currentTarget.selectionEnd = selStartPos + 4
      evt.preventDefault()

      setValue(newValue)
      onChange && onChange(newValue)
    }
  }

  const handleOnChange = useCallback(({ target: { value } }) => setValue(value), [])

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  useEffect(() => {
    Prism.highlightAll()
  }, [props.language, value])

  return (
    <div className='code-edit-container'>
      <TextArea
        className='code-input'
        value={value}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <pre className='code-output'>
        <code className={`language-${language}`}>{value}</code>
      </pre>
    </div>
  )
}

export default CodeEditor
