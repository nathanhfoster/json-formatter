import React, { memo } from "react"

const MemoizedComponent = ({ Component, children, ...props }) =>
  children ? (
    <Component {...props}>{children}</Component>
  ) : (
    <Component {...props} />
  )

export default memo(MemoizedComponent)
