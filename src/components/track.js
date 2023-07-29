import React, { useEffect } from "react"
import { mixpanel } from "../helpers/mixpanel"

const Track = () => {
  useEffect(() => {
    if (mixpanel.get_distinct_id().indexOf("@") === -1) {
      document.cookie = `wf-lm-id=${mixpanel.get_distinct_id()};domain=.withfriends.co;secure;path=/`
    }

    // mixpanel.track("Visited Why Withfriends")
  }, [])

  useEffect(() => {
    if (typeof window.fbq === `function`) {
      window.fbq('init', '582245315891033')
      window.fbq('track', 'PageView')
    }
  }, [])

  useEffect(() => {
    if (window.Intercom) window.Intercom("boot", { app_id: "ohqapfc3" })
  })

  return (
    <>
      <script
        type="text/javascript"
        id="hs-script-loader"
        async
        defer
        src="//js.hs-scripts.com/6328349.js"
      ></script>
    </>
  )
}

export default Track
