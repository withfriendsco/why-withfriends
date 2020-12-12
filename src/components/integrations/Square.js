import * as React from "react"

function SvgSquare(props) {
  return (
    <svg
      baseProfile="tiny"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      overflow="visible"
      {...props}
    >
      <path d="M28.7 1.5H6.4C3.3 1.5.8 4 .8 7.1v22.3c0 3.1 2.5 5.6 5.6 5.6h22.3c3.1 0 5.6-2.5 5.6-5.6V7.1c0-3.1-2.5-5.6-5.6-5.6zm-.5 25.6c0 1-.8 1.8-1.8 1.8H8.7c-1 0-1.8-.8-1.8-1.8V9.3c0-1 .8-1.8 1.8-1.8h17.8c1 0 1.8.8 1.8 1.8v17.8z" />
      <path d="M14 22.8c-.6 0-1-.5-1-1v-7.1c0-.6.5-1 1-1h7.1c.6 0 1 .5 1 1v7.1c0 .6-.5 1-1 1H14z" />
    </svg>
  )
}

export default SvgSquare
