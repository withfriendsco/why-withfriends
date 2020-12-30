import React, { useEffect } from "react"
import { mixpanel, becomeAnOrganizer } from "../helpers/mixpanel"

import Button from "./Button"

export const goToSignup = () => {
  becomeAnOrganizer()
  window.scrollTo(0, 0)
}

const BecomeAnOrganizer = () => {
  useEffect(() => {
    mixpanel.track_links(".become-an-organizer", "Clicked Become An Organizer")
  })

  return (
    <div className="flex w-full justify-center">
      <div className="flex justify-end">
        <Button
          className="py-6 px-8 sm:px-12 text-xl"
          variant="salmon"
          onClick={goToSignup}
        >
          Find your members
        </Button>
      </div>
    </div>
  )
}

export default BecomeAnOrganizer

