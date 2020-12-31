import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Button from "./Button"
import Wordmark from "./Wordmark"
import UTMLink from "./UTMLink"
import { mixpanel, becomeAnOrganizer } from "../helpers/mixpanel"

const Header = ({ siteTitle, isPrimer }) => {
  const pricingLink = isPrimer ? (
    <a
      href="#pricing"
      className="color-salmon-600 no-underline ml-8 justify-self-end hidden md:inline-block"
    >
      Pricing
    </a>
  ) : (
    <UTMLink
      href="https://withfriends.co/pricing"
      className="color-salmon-600 no-underline ml-8 justify-self-end hidden md:inline-block"
    >
      Pricing
    </UTMLink>
  )

  return (
    <header className="fixed w-full flex flex-nowrap border-b bg-white border-wfGray-300 justify-center z-50 shadow-sm">
      <nav className="top-0 py-2 w-full flex flex-grow items-center px-4 sm:px-8">
        <h2 className="inline-block">
          <Link to="/organizers" className="color-salmon-600 no-underline">
            <Wordmark className="h-5" />
          </Link>
        </h2>
        <div className="justify-self-end flex-grow" />
        <button
          className="color-salmon-600 no-underline ml-2 justify-self-end hidden md:inline-block beamer-news"
          onClick={() => { mixpanel.track("Clicked What's new"); return false; }}
        >
          What's new
        </button>
        <Link
          to="/"
          className="color-salmon-600 no-underline ml-8 justify-self-end hidden md:inline-block"
        >
          Insights
        </Link>
        <Link
          to="/organizers"
          className="color-salmon-600 no-underline ml-8 justify-self-end hidden md:inline-block"
        >
          Why Withfriends?
        </Link>
        {
          pricingLink
        }
        <div className="text-wfGray-300 h-8 mr-4 pr-4 border-r border-wfGray-300 hidden md:inline-block" />
        <UTMLink
          href="https://withfriends.co/action/363/sign_in/modal"
          className="color-salmon-600 no-underline mr-4 justify-self-end hidden md:inline-block"
        >
          Log In
        </UTMLink>
        <UTMLink
          className="inline-block justify-self-end justify-end"
          href="https://withfriends.co/action/364/sign_up/modal"
          text="Get Started"
        >
          <div className="flex justify-end">
            <Button onClick={becomeAnOrganizer} variant="salmon-sm">
              Get Started
            </Button>
          </div>
        </UTMLink>
      </nav>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
