import React from "react"

const IconItem = ({ icon, text }) => (
  <div className="flex-1 min-w-1/3 my-4 px-2">
    {React.cloneElement(icon, { className: "mx-auto w-8 sm:w-12" })}
    <div className="mt-4 text-sm sm:text-md font-heavy">{text}</div>
  </div>
)

export default IconItem

