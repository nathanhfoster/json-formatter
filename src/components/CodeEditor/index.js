import React, { useState, useCallback, useEffect } from 'react'
import { TextArea } from '../'
import './index.css'

const CodeEditor = ({ language = 'javascript', onChange, ...props }) => {
  const [value, setValue] = useState(props.value)
  const [selectionStart, setSelectionStart] = useState(0)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  const handleKeyDown = e => {
    const {
      currentTarget: { selectionStart, selectionEnd },
    } = e
    let newValue = value

    // handle 4-space indent on
    if (e.key === 'Tab') {
      newValue =
        newValue.substring(0, selectionStart) +
        '    ' +
        newValue.substring(selectionStart, newValue.length)
      setSelectionStart(selectionStart + 3)
      e.preventDefault()

      setValue(newValue)
      onChange && onChange(e)
    }
  }

  const handleOnChange = useCallback(({ target: { value } }) => setValue(value), [])

  return (
    <TextArea
      value={value}
      selectionStart={selectionStart}
      selectionEnd={selectionStart + value.length}
      onChange={handleOnChange}
      onKeyDown={handleKeyDown}
    />
  )
}

export default CodeEditor
