import React, { forwardRef } from 'react'
import './index.css'

const Button = forwardRef(
  ({ className, style = {}, color = 'var(--secondaryColor)', children, ...buttonProps }, ref) => {
    const classN = className ? `Button ${className}` : 'Button'
    const styles = { ...style, backgroundColor: color }
    return (
      <button {...buttonProps} ref={ref} className={classN} style={styles}>
        {children}
      </button>
    )
  },
)
export default Button
