import React from 'react'
import './index.css'

const Container = ({ className, children, ...props }) => {
  const classN = className ? `Container ${className}` : 'Container'
  return (
    <div {...props} className={classN}>
      {children}
    </div>
  )
}

export default Container
