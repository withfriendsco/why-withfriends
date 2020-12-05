import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Button from "./Button"
import Wordmark from "./Wordmark"

const Header = ({ siteTitle }) => (
  <header className="fixed w-full flex flex-nowrap border-b bg-white border-wfGray-300 justify-center z-10">
    <div className="top-0 py-2 w-full flex flex-grow items-center px-4 sm:px-16">
      <h2 className="inline-block">
        <Link to="/" className="color-salmon-600 no-underline">
          <Wordmark className="h-5" />
        </Link>
      </h2>
      <div className="justify-self-end flex-grow" />
      <a
        href="https://withfriends.co/organizers"
        className="color-salmon-600 no-underline ml-2 justify-self-end"
      >
        Why Withfriends?
      </a>
      <a
        href="https://withfriends.co/pricing"
        className="color-salmon-600 no-underline ml-8 justify-self-end"
      >
        Pricing
      </a>
      <div className="text-wfGray-300 h-8 mr-4 pr-4 border-r border-wfGray-300" />
      <a
        href="https://withfriends.co/action/363/sign_in/modal"
        className="color-salmon-600 no-underline mr-4 justify-self-end"
      >
        Log In
      </a>
      <a
        className="inline-block justify-self-end justify-end"
        href="https://withfriends.co/action/364/sign_up/modal"
      >
        <div className="flex justify-end">
          <Button variant="salmon-sm">Get Started</Button>
        </div>
      </a>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
