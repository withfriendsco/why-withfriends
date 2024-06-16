import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import Button from "./Button"
import Wordmark from "./Wordmark"
import UTMLink from "./UTMLink"
import SvgMenu from "../icons/SvgMenu"
import { mixpanel, becomeAnOrganizer } from "../helpers/mixpanel"

import {addAppHref, oldAddAppUrl, addAppUrl} from "../helpers/addapp"

const Header = ({ siteTitle, isPrimer, setShowModal, useOldLink = false }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const pricingLink = isPrimer ? (
    <a
      href="#pricing"
      className="color-salmon-600 no-underline ml-2 md:ml-6 justify-self-end"
      onClick={() => setShowMobileMenu(false)}
    >
      Pricing
    </a>
  ) : (
    <a
      href="/#pricing"
      className="color-salmon-600 no-underline ml-2 md:ml-6 justify-self-end"
      onClick={() => setShowMobileMenu(false)}
    >
      Pricing
    </a>
  )

  const mobileMenu = (
    <div className="absolute right-0 md:hidden top-12 z-100 bg-white flex flex-wrap justify-end text-right p-4 w-full">
      <button
        className="color-salmon-600 no-underline beamer-news block mb-2"
        onClick={() => { return false; }}
        style={{display:"none"}}
      >
        What's new
      </button>
      <UTMLink
        href={(process.env.GATSBY_JELLY_URL || "https://dev.better.space") + "/discover"}
        className="color-salmon-600 no-underline block w-full mb-2"
      >
        Discover businesses
      </UTMLink>
      <Link
        to="/case_studies"
        className="color-salmon-600 no-underline block w-full mb-2"
      >
        Case studies
      </Link>
      <div className="block w-full mb-2">
        {
          pricingLink
        }
      </div>
      <UTMLink
        href={(process.env.GATSBY_JELLY_URL || "https://dev.better.space") + "/action/363/sign_in/modal"}
        className="color-salmon-600 no-underline block w-full mb-2"
      >
        Log In
      </UTMLink>
      <UTMLink
        className="block w-full mb-2"
        href={useOldLink ? oldAddAppUrl : addAppUrl}
        text="Start free trial"
      >
        <div className="block w-full">
          <Button onClick={() => becomeAnOrganizer("header")} variant="salmon-sm">
            Start free trial
          </Button>
        </div>
      </UTMLink>
    </div>
  )

  return (
    <header className="fixed w-full flex flex-nowrap border-b bg-white border-wfGray-300 justify-center z-50 shadow-sm">
      { showMobileMenu && mobileMenu }
      <nav className="top-0 py-2 w-full flex flex-grow items-center px-4 sm:px-8">
        <h2 className="inline-block">
          <Link to="/" className="color-salmon-600 no-underline">
            <Wordmark className="h-5" />
          </Link>
        </h2>
        <div className="md:hidden flex-grow justify-end flex">
          <div className="justify-self-end flex-grow" />
          <SvgMenu onClick={() => setShowMobileMenu(!showMobileMenu)} className="text-wfGray-300 fill-current justify-self-end" />
        </div>
        <div className="hidden md:inline-block flex-1 align-right text-right">
          <button
            className="color-salmon-600 no-underline ml-2 justify-self-end beamer-news inline-block"
            onClick={() => { return false; }}
            style={{display:"none"}}
          >
            What's new
          </button>
          <UTMLink
            href={(process.env.GATSBY_JELLY_URL || "https://dev.better.space") + "/discover"}
            className="color-salmon-600 no-underline ml-2 md:ml-6 justify-self-end inline-block"
          >
            Discover businesses
          </UTMLink>
          <Link
            to="/case_studies"
            className="color-salmon-600 no-underline ml-2 md:ml-6 justify-self-end inline-block"
          >
            Case studies
          </Link>
          {
            pricingLink
          }
          <div className="text-wfGray-300 h-8 mr-4 pr-4 border-r justify-self-end border-wfGray-300 inline inline-block" />
          <UTMLink
            href={(process.env.GATSBY_JELLY_URL || "https://dev.better.space") + "/action/363/sign_in/modal"}
            className="color-salmon-600 no-underline mr-6 justify-self-end inline-block"
          >
            Log In
          </UTMLink>
          <UTMLink
            className="inline-block"
            href={useOldLink ? oldAddAppUrl : addAppUrl}
            text="Get the app"
          >
            <div className="flex justify-end">
              <Button onClick={() => becomeAnOrganizer("header")} variant="salmon-sm">
                Start free trial
              </Button>
            </div>
          </UTMLink>
        </div>
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
