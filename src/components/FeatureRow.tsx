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
		<div className="w-full flex justify-center my-8">
			<div className="max-w-screen-xl w-full flex justify-center">
				<div className={`m-4 flex-1 ${imageFirst ? "order-3" : "order-1" }`}>
					<div className="p-8 md:px-32 md:py-24">
						<h3 className="mb-8 md:mb-16 text-wfGray-800">{featureRow.title}</h3>
						<p className="prose md:prose-md">{featureRow.content}</p>
					</div>
				</div>
				<div className="flex-1 bg-wfGray-100 order-2">
					<div className="p-8">
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

