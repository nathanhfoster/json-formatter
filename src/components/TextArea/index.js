import React, { forwardRef } from "react"
import "./index.css"

const TextArea = forwardRef((props, ref) => {
  return <textarea ref={ref} className="TextArea" {...props} />
})
export default TextArea
