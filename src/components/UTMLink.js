import React from "react"
import UTM from "../helpers/utm"

const UTMLink = ({ href, className, text, children, onClick }) => {
  let content = text || encodeURIComponent(children.text)
  return (
    <a href={`${href}?${UTM}&utm_content=${content}`} className={className} onClick={onClick}>
      {children}
    </a>
  )
}

export default UTMLink
