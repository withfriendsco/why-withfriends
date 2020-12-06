/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Track from "../components/track"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="font-sans">
      <Track />
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div className="flex flex-wrap justify-center pt-24 md:pt-32">
        <div className="w-full px-4 md:px-8">
          <main>{children}</main>
        </div>
      </div>
      <footer className="mt-4 md:mt-16 py-4 md:py-16 bg-wfGray-800 text-white flex flex-wrap md:flex-nowrap">
        <div className="pl-2 md:pl-16 justify-self-start text-white flex-grow md:flex-grow-0 text-center md:text-left">
          <p className="text-white">
            <a href="https://withfriends.co/organizers">Why Withfriends?</a>
          </p>
          <p className="text-white">
            <a href="https://withfriends.co/disclaimer/terms_of_service/page">
              Terms of Service
            </a>
          </p>
          <p className="text-white">
            <a href="https://withfriends.co/disclaimer/code_of_conduct/page">
              Code of Conduct
            </a>
          </p>
          <p className="text-white">
            <a href="https://withfriends.co/meet_the_team">Our Team</a>
          </p>
          <p className="text-white">
            <a href="https://withfriends.co/pricing">Pricing</a>
          </p>
          <p className="text-white">
            <a href="mailto:team@withfriends.co">Contact</a>
          </p>
        </div>
        <div className="px-2 md:px-16"></div>
        <div className="px-2 mt-4 md:mt-0 md:pr-16 min-w-sm justify-self-end text-center md:text-left">
          <p className="text-center md:text-left">
            Withfriends is dedicated to the preservation of community culture,
            spaces, and small businesses. Get in touch to learn more.
          </p>
        </div>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
