import React from 'react'
import './index.css'

const Col = ({ className, xs = 12, children, ...props }) => {
  const classN = className ? `Col ${className}` : 'Col'
  const percent = (xs / 12) * 100
  const style = { msFlex: `0 0 ${percent}%`, flex: `0 0 ${percent}%`, maxWidth: `${percent}%` }

  return (
    <div {...props} className={classN} style={style}>
      {children}
    </div>
  )
}

export default Col
