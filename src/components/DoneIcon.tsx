import React from 'react'
import SvgCheckmark from '../icons/SvgCheckmark'

const DoneIcon = () => {
  return (
    <div className="relative top-2 inline-block text-left mr-4">
      <SvgCheckmark className="text-salmon-700 h-4 w-4 fill-current" />
    </div>
  )
}

export default DoneIcon
