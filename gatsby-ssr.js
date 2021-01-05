/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

import React from "react"

export const onRenderBody = ({ setHeadComponents }) => {
  return setHeadComponents([
    <script key="wf-facebook-pixel"
      dangerouslySetInnerHTML={{__html: `!function(f,b,e,v,n,t,s) {
          if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');`}}>
    </script>,
    <noscript key="wf-facebook-pixel-noscript">
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt="pixel"
        src="https://www.facebook.com/tr?id=582245315891033&ev=PageView&noscript=1"
      />
    </noscript>,
    <script key="wf-library" type="text/javascript" src="https://danjg53usxhfc.cloudfront.net/api/withfriends.js?version=6" />,
    <script key="wf-jquery" type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js" />,
    <script key="wf-load-library" type="text/javascript" dangerouslySetInnerHTML={{
      __html: `var jq = $.noConflict(true);Withfriends.Set_jQuery(jq);` }} />,
  ])
}

