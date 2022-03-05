const mixpanel = require("mixpanel-browser")
const mixpanelKey = (process.env.GATSBY_MIXPANEL_KEY || "287044101a1f47c209745cab2afcbb0e")
mixpanel.init(mixpanelKey)

const becomeAnOrganizer = (clickLocation) => {
  mixpanel.track("Clicked Become an Organizer", {location: clickLocation})
}

const becomeASquareOrganizer = () => {
  mixpanel.track("Shopify Connect Continued to Legacy")
}

export { mixpanel, becomeAnOrganizer, becomeASquareOrganizer }
