import React, { forwardRef } from 'react'
import './index.css'

const Input = forwardRef(({ className, ...inputProps }, ref) => {
  const classN = className ? `Input ${className}` : 'Input'
  return <input {...inputProps} ref={ref} className={classN} />
})

export default Input
