import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className="fixed w-full flex flex-wrap border-b bg-white border-wfGray-300 justify-center">
    <div className="top-0 py-4">
      <h1>
        <Link to="/" className="color-salmon-600 no-underline">
          {siteTitle}
        </Link>
      </h1>
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
