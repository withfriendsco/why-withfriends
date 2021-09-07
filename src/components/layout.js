/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Track from "../components/track"
import "./layout.css"
import UTMLink from "./UTMLink"

import Modal from 'react-modal';
import {closeModal, addCloseModalListener} from "../helpers/addapp"

Modal.setAppElement('#___gatsby');

const Layout = ({ children, isPrimer, showModal, setShowModal}) => {  

  useEffect(() => {
    const intercomElement = document.querySelector("#intercom-container, .intercom-lightweight-app")
    if (window.Intercom && intercomElement) {
      if (showModal)
        intercomElement.style.display = "none"
      else
        intercomElement.style.display = "initial"
    }
  }, [showModal])

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const pricingLink = isPrimer ? (
    <a href="#pricing">Pricing</a>
  ) : (
    <a href="/#pricing">Pricing</a>
  )

  addCloseModalListener(setShowModal)

  return (
    <div className="font-sans">
      <Track />
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} isPrimer={isPrimer} setShowModal={setShowModal}/>
      <div className="flex flex-wrap justify-center pt-24 md:pt-32">
        <div className="w-full px-4 md:px-8">
          <main>{children}</main>
          <Modal 
            isOpen={showModal}
            onRequestClose={() => closeModal(setShowModal)}
            className="add-app-modal-content"
            overlayClassName="add-app-modal-overlay"
          >
            <iframe style={{width:"100%", height:"100%", border: "none"}} src={(process.env.GATSBY_JELLY_URL || "http://localhost") + "/add_shopify_app/modal:is_embedded"}/>
          </Modal>
        </div>
      </div>
      <footer className="py-4 md:py-16 bg-wfGray-800 text-white flex flex-wrap md:flex-nowrap">
        <div className="pl-2 md:pl-16 justify-self-start text-white flex-grow md:flex-grow-0 text-center md:text-left">
          <p className="text-white">
            <UTMLink href="/">
              Why Withfriends?
            </UTMLink>
          </p>
          <p className="text-white">
            {pricingLink}
          </p>
          <p className="text-white">
            <UTMLink href={(process.env.GATSBY_JELLY_URL || "https://dev.better.space") + "/meet_the_team"}>
              Our team
            </UTMLink>
          </p>
          <p className="text-white">
            <UTMLink href="mailto:team@withfriends.co">Contact</UTMLink>
          </p>
        </div>
        <div className="px-2 md:px-16 md:flex-grow"></div>
        <div className="px-2 mt-4 md:mt-0 md:pr-16 min-w-sm justify-self-end text-center md:text-right">
          <p className="text-center md:text-right md:max-w-xs mb-4">
            Withfriends is dedicated to the preservation of community culture,
            spaces, and small businesses.
          </p>
          <p className="text-center md:text-right md:max-w-xs">
            <a href="mailto:team@withfriends.co">Get in touch</a> to learn more.
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
