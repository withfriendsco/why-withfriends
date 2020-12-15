import React, { useEffect } from "react"

import { mixpanel } from "../helpers/mixpanel"

const fbPixel = `!function(f,b,e,v,n,t,s) {
  if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '582245315891033');
  fbq('track', 'PageView');`

const Track = () => {
  useEffect(() => {
    mixpanel.track("Visited Why Withfriends")
  }, [])

  useEffect(() => {
    if (window.Intercom) window.Intercom("boot", { app_id: "ohqapfc3" })
  })

  return (
    <>
      <script>{fbPixel}</script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt="pixel"
          src="https://www.facebook.com/tr?id=582245315891033&ev=PageView&noscript=1"
        />
      </noscript>
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
