/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

exports.onRouteUpdate = function() {
  if (typeof window.fbq === `function`) {
    window.fbq("track", "ViewContent")
  }
}
