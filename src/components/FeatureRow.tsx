import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { GatsbyImageFluidProps } from "gatsby-image"

interface FeatureRowData {
	imageFirst: boolean
	featureRow: {
		image: {
			childImageSharp: GatsbyImageFluidProps
		}
		content: string
		title: string
	}
}

const FeatureRow = ({ imageFirst, featureRow }: FeatureRowData) => {
	return (
		<div className="w-full flex justify-center">
			<div className="max-w-screen-xl w-full flex flex-wrap sm:flex-nowrap justify-center text-center sm:text-left items-center">
				<div className={`m-2 sm:m-4 flex-1 order-3 ${imageFirst ? "" : "sm:order-1" }`}>
					<div className="pt-8 sm:p-8 md:p-16 lg:py-24 xl:px-32 xl:py-24">
						<h2 className="mb-8 font-bold text-2xl md:mb-12 lg:mb-16 text-wfGray-800">{featureRow.title}</h2>
						<p className="prose md:prose-md text-wfGray-800">{featureRow.content}</p>
					</div>
				</div>
				<div className="w-full sm:hidden order-2" />
				<div className="flex-1 order-1 -mx-4 sm:-mx-8 px-8 sm:mx-0 sm:px-0 p-4 sm:p-8 md:p-16 align-items-center">
					<div className="sm:p-4 align-items-center">
						<Img 
							fadeIn={true}
							imgStyle={{objectFit: 'contain'}}
							fluid={{...featureRow.image.childImageSharp.fluid, aspectRatio: 4/3}}
							alt="Sample tiers for a subscription membership on Withfriends"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FeatureRow

