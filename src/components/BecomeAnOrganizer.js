import React, { useEffect } from "react"
import { mixpanel, becomeAnOrganizer } from "../helpers/mixpanel"

import Button from "./Button"
import UTMLink from "./UTMLink"

import {addAppHref} from "../helpers/addapp"

const BecomeAnOrganizer = ({translationMapping, setShowModal}) => {
  /*
  useEffect(() => {
    mixpanel.track_links(".become-an-organizer", "Clicked Become An Organizer")
  })
  */

  const becomeAnOrganizerLink = (process.env.GATSBY_JELLY_URL || "https://dev.better.space") + "/add_shopify_app/modal"

  return (
    <div className="flex w-full justify-center">
      <UTMLink
        className="inline-block justify-self-end justify-end become-an-organizer"
        href={becomeAnOrganizerLink}
        text="Find your members"
        onClick={(clickEvent) => addAppHref(clickEvent, setShowModal)}
      >
        <div className="flex justify-end">
          <Button
            className="py-6 px-8 sm:px-12 text-xl"
            variant="salmon"
            onClick={() => becomeAnOrganizer("content")}
          >
            Add App
          </Button>
        </div>
      </UTMLink>
    </div>
  )
}

export default BecomeAnOrganizer

