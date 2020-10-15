import React from 'react'
import './index.css'

const Row = ({ className, children, ...props }) => {
  const classN = className ? `Row ${className}` : 'Row'

  return (
    <div {...props} className={classN}>
      {children}
    </div>
  )
}

export default Row
