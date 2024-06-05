import React, { useEffect } from "react"
import { mixpanel, becomeAnOrganizer } from "../helpers/mixpanel"

import Button from "./Button"
import UTMLink from "./UTMLink"

import {addAppHref, addAppUrl} from "../helpers/addapp"

const BecomeAnOrganizer = ({translationMapping, setShowModal}) => {
  /*
  useEffect(() => {
    mixpanel.track_links(".become-an-organizer", "Clicked Become An Organizer")
  })
  */

  return (
    <div className="flex w-full justify-center">
      <UTMLink
        className="inline-block justify-self-end justify-end become-an-organizer"
        href={addAppUrl}
        text="Get the app"
      >
        <div className="flex justify-end">
          <Button
            className="py-6 px-8 sm:px-12 text-xl"
            variant="salmon"
            onClick={() => becomeAnOrganizer("content")}
          >
            Try it free
          </Button>
        </div>
      </UTMLink>
    </div>
  )
}

export default BecomeAnOrganizer

