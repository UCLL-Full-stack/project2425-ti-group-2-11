import React from 'react'

interface ScrollableRowProps {
  items: React.ReactNode[]
}

export function ScrollableRow({ items }: ScrollableRowProps) {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 pb-4">{items}</div>
    </div>
  )
}

