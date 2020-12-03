import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Button from "./Button"

const Header = ({ siteTitle }) => (
  <header className="fixed w-full flex flex-nowrap border-b bg-white border-wfGray-300 justify-center">
    <div className="top-0 py-4 w-full max-w-4xl flex flex-grow items-center">
      <div className="inline-block">
        <Link to="/" className="color-salmon-600 no-underline">
          {siteTitle}
        </Link>
      </div>
      <a className="inline-block justify-self-end justify-end flex-grow" href="https://withfriends.co/action/364/sign_up/modal">
        <div className="flex justify-end">
          <Button variant="salmon">
            Get Started
          </Button>
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
