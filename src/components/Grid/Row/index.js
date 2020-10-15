import React from 'react'
import './index.css'

const Row = ({ className, style = {}, children, ...props }) => {
  const classN = className ? `Row ${className}` : 'Row'
  const styles = { ...style }

  return (
    <div {...props} className={classN} style={styles}>
      {children}
    </div>
  )
}

export default Row
