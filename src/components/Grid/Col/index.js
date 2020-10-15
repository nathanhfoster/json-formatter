import React from 'react'
import './index.css'

const Col = ({ className, style = {}, xs = 12, children, ...props }) => {
  const classN = className ? `Col ${className}` : 'Col'
  const percent = (xs / 12) * 100
  const styles = {
    ...style,
    msFlex: `0 0 ${percent}%`,
    flex: `0 0 ${percent}%`,
    maxWidth: `${percent}%`,
  }

  return (
    <div {...props} className={classN} style={styles}>
      {children}
    </div>
  )
}

export default Col
