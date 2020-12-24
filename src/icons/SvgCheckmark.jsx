import * as React from "react";

function SvgCheckmark(props) {
  return (
    <svg viewBox="0 0 20 20" {...props}>
      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
    </svg>
  );
}

export default SvgCheckmark;