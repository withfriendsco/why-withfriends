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

const intercomOne = `window.intercomSettings = { app_id: "ohqapfc3"; };`
const intercomTwo = `(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/' + APP_ID;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`

const Track = () => {
  useEffect(() => {
    mixpanel.track("Visited Why Withfriends", {
      url: window.location,
    })
  }, [])

  return (
    <>
      <script>{intercomOne}</script>
      <script>{intercomTwo}</script>
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
