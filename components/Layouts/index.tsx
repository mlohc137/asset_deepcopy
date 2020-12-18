import * as React from 'react'

interface Props {
    children: React.ReactNode
}

export function CenteredColumn(props: Props) {
  const { children } = props
  return (
    <div className="flex flex-col mx-auto justify-content max-w-screen-sm">
      {children}
    </div>
  )
}
