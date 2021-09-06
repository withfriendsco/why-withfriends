const mixpanel = require("mixpanel-browser")
const mixpanelKey = process.env.GATSBY_MIXPANEL_KEY
mixpanel.init(mixpanelKey)

const becomeAnOrganizer = (clickLocation) => {
  mixpanel.track("Clicked Become an Organizer", {location: clickLocation})
}

export { mixpanel, becomeAnOrganizer }
