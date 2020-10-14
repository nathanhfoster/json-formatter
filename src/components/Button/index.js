import React, { forwardRef } from "react"
import "./index.css"

const Button = forwardRef(({ children, ...buttonProps }, ref) => {
  return (
    <button ref={ref} className="Button" {...buttonProps}>
      {children}
    </button>
  )
})
export default Button
