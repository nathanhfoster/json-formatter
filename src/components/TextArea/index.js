import React, { forwardRef } from 'react'
import './index.css'

const TextArea = forwardRef(({ className, ...textAreaProps }, ref) => {
  const classN = className ? `TextArea ${className}` : 'TextArea'
  return <textarea {...textAreaProps} ref={ref} className={classN} />
})
export default TextArea
