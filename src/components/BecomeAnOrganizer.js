import React, { useEffect } from "react"
import { mixpanel } from "../helpers/mixpanel"

import Button from "./Button"
import UTMLink from "./UTMLink"

const BecomeAnOrganizer = ({translationMapping}) => {
  useEffect(() => {
    mixpanel.track_links(".become-an-organizer", "Clicked Become An Organizer")
  })

  // const becomeAnOrganizerLink = (process.env.GATSBY_JELLY_URL || "https://dev.better.space") + "/action/364/sign_up/modal"
  const becomeAnOrganizerLink = (process.env.GATSBY_JELLY_URL || "https://dev.better.space") + "/add_shopify_app/modal"
  
  return (
    <div className="flex w-full justify-center">
      <UTMLink
        className="inline-block justify-self-end justify-end become-an-organizer"
        href={becomeAnOrganizerLink}
        text="Find your members"
      >
        <div className="flex justify-end">
          <Button
            className="py-6 px-8 sm:px-12 text-xl"
            variant="salmon"
          >
            Add App
          </Button>
        </div>
      </UTMLink>
    </div>
  )
}

export default BecomeAnOrganizer

