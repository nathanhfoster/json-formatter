import React from 'react'
import './index.css'

const Container = ({ className, style = {}, children, ...props }) => {
  const classN = className ? `Container ${className}` : 'Container'
  const styles = { ...style }
  return (
    <div {...props} className={classN} style={styles}>
      {children}
    </div>
  )
}

export default Container
