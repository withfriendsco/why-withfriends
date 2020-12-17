import React from "react"
import UTM from "../helpers/utm"

const UTMLink = ({ href, className, text, children }) => {
  let content = text || encodeURIComponent(children.text)
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

export default UTMLink
