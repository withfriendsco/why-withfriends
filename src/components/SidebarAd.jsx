import React from "react"
import Button from "./Button"
import UTMLink from "./UTMLink"
import { becomeAnOrganizer } from "../helpers/mixpanel"
import {addAppHref} from "../helpers/addapp"

// const becomeAnOrganizerLink = (process.env.GATSBY_JELLY_URL || "https://dev.better.space") + "/action/364/sign_up/modal"
const becomeAnOrganizerLink = (process.env.GATSBY_JELLY_URL || "https://dev.better.space") + "/add_shopify_app/modal"

const SidebarAd = ({setShowModal}) => (
  <div className="p-4 sm:p-8 border-salmon-600 border-2 shadow-lg">
    <div className="prose">
      <h2 className="text-center mb-4">
        Sell memberships for your small business, automatically.
      </h2>
      <p>
        Withfriends makes it easy to sell memberships for any business. Whether
        you run an online e-commerce store, a music venue, or a brick-and-mortar
        bookstore, you can use Withfriends to build sustainable recurring
        revenue for your business or organization.
      </p>{" "}
      <p>
        <a href="https://withfriends.co/organizers">Learn more</a>.
      </p>
      <h3 className="mb-4">Curious who else uses Withfriends?</h3>
      <p>
        We've got everyone from&nbsp;
        <a
          href="https://withfriends.co/elsewhere?utm_medium=referral&utm_content=music%20venues"
          rel="noreferrer"
          target="_blank"
        >
          music venues
        </a>
        , to&nbsp;
        <a
          href="https://withfriends.co/dimos_pizza?utm_medium=referral&utm_content=restaurants"
          rel="noreferrer"
          target="_blank"
        >
          restaurants
        </a>
        , to&nbsp;
        <a
          href="https://withfriends.co/stick_figure?utm_medium=referral&utm_content=bands%20selling%20merch%20direct%20to%20fans"
          rel="noreferrer"
          target="_blank"
        >
          bands selling merch direct to fans
        </a>
        , to&nbsp;
        <a
          href="https://withfriends.co/cabrire_farm?utm_medium=referral&utm_content=farm%20to%20table%20produce%20operations"
          rel="noreferrer"
          target="_blank"
        >
          farm-to-table produce operations
        </a>{" "}
        on Withfriends.
      </p>{" "}
      <p>
        <a
          href={(process.env.GATSBY_JELLY_URL || "https://dev.better.space") + "/discover"}
          rel="noreferrer"
          target="_blank"
        >
          Check out all our organizers
        </a>
        .
      </p>
    </div>

    <div className="flex w-full justify-center mt-8">
      <UTMLink
        className="inline-block justify-self-end justify-end"
        href={becomeAnOrganizerLink}
        text="Add App"
        onClick={(clickEvent) => addAppHref(clickEvent, setShowModal)}
      >
        <div className="flex justify-end">
          <Button onClick={() => becomeAnOrganizer("sidebar")} variant="salmon">
            Add App
          </Button>
        </div>
      </UTMLink>
    </div>
  </div>
)

export default SidebarAd
