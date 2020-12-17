import React, { useEffect } from "react"
import { mixpanel } from "../helpers/mixpanel"

import Button from "./Button"
import UTMLink from "./UTMLink"

const BecomeAnOrganizer = () => {
  useEffect(() => {
    mixpanel.track_links(".become-an-organizer", "Clicked Become An Organizer")
  })

  return (
    <div className="flex w-full justify-center">
      <UTMLink
        className="inline-block justify-self-end justify-end"
        href="https://withfriends.co/action/364/sign_up/modal"
        text="Find your members"
      >
        <div className="flex justify-end become-an-organizer">
          <Button
            className="py-6 px-8 sm:px-12 text-xl"
            variant="salmon"
          >
            Find your members
          </Button>
        </div>
      </UTMLink>
    </div>
  )
}

export default BecomeAnOrganizer

