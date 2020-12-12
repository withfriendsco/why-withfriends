import React from "react"

const Button = ({
  children,
  variant,
  onClick,
  className,
  loading,
  disabled,
  done,
}) => {
  let classes =
    "py-3 px-8 inline active:relative active:-left-2 active:-bottom-2 my-2 no-underline static"

  if (variant === "salmon") {
    classes += " border-none text-white shadow-lg active:shadow-none text-white"
    if (done || disabled) {
      classes += " bg-wfGray-600"
    } else {
      classes += " bg-salmon-600 active:bg-salmon-700"
    }
  }

  if (variant === "salmon-sm") {
    classes +=
      " border-none text-white text-sm shadow-lg active:shadow-none text-white"
    if (done || disabled) {
      classes += " bg-wfGray-600"
    } else {
      classes += " bg-salmon-600 active:bg-salmon-700"
    }
  }

  if (variant === "outlined") {
    classes += " border-wfGray-600 bg-white rounded-none border text-wfGray-800"
    if (disabled) {
      classes += " hover:border-wfGray-600 text-wfGray-800"
    } else {
      classes += " hover:border-wfGray-800"
    }
  }

  if (disabled) {
    classes += " cursor-not-allowed"
  }

  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled || done}
        className={classes + " " + className}
        style={{ textDecoration: "none" }}
      >
        {children}
      </button>
    </div>
  )
}

export default Button

