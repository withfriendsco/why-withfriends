import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Img from "gatsby-image"
import { GatsbyImageFluidProps } from "gatsby-image"
import { BecomeAnOrganizer } from "../pages/organizers"

interface FeatureRowData {
  imageFirst: boolean
  featureRow: {
    image: {
      childImageSharp: GatsbyImageFluidProps
    }
    content: string
    title: string
    link?: string
    linkText?: string
  }
}

const FeatureRow = ({ imageFirst, featureRow }: FeatureRowData) => {
  return (
    <div className="w-full flex flex-wrap justify-center">
      <div className="max-w-screen-xl w-full flex flex-wrap sm:flex-nowrap justify-center text-center sm:text-left items-center">
        <div
          className={`m-2 sm:m-4 flex-1 order-3 ${
            imageFirst ? "" : "sm:order-1"
          }`}
        >
          <div className="pt-8 sm:p-8 md:p-12">
            <h2 className="mb-8 font-bold text-2xl md:mb-12 lg:mb-16 text-wfGray-800">
              {featureRow.title}
            </h2>
            <p className="prose md:prose-md text-wfGray-800">
              {featureRow.content}
            </p>
            {featureRow.link && featureRow.linkText && (
              <p className="mt-4 md:mt-8 prose md:prose-lg font-bold text-salmon-700">
                <Link
                  to={featureRow.link}
                  className="text-salmon-700 font-bold"
                >
                  {featureRow.linkText}
                </Link>
              </p>
            )}
          </div>
        </div>
        <div className="w-full sm:hidden order-2" />
        <div className="flex-1 order-1 -mx-4 sm:-mx-8 px-8 sm:mx-0 sm:px-0 p-4 md:p-6 align-items-center">
          <div className="sm:p-4 align-items-center">
            <Img
              fadeIn={true}
              imgStyle={{ objectFit: "contain" }}
              fluid={{
                ...featureRow.image.childImageSharp.fluid,
                aspectRatio: 4 / 3,
              }}
              alt="Sample tiers for a subscription membership on Withfriends"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureRow
