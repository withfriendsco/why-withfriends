const mixpanel = require("mixpanel-browser")
mixpanel.init("5c91cd64f52c6452741c98f5e6615923")

const becomeAnOrganizer = () => {
  mixpanel.track_links("Clicked Become an Organizer")
}

export { mixpanel, becomeAnOrganizer }
