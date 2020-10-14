import React, { forwardRef } from "react"
import "./index.css"

const Input = forwardRef((props, ref) => {
  return <input ref={ref} className="Input" {...props} />
})

export default Input
