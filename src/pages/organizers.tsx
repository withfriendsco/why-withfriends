import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/Button"
import UTMLink from "../components/UTMLink"
import FeatureRow from "../components/FeatureRow"
import { becomeAnOrganizer } from "../helpers/mixpanel"

const OrganizersPage = ({ data }) => {
	let imageFirst = false
	const featureRows = data.allFeatureRowsYaml.edges.map(node => {
		imageFirst = !imageFirst
		return (
			<FeatureRow key={node.node.id} imageFirst={imageFirst} featureRow={node.node} />
		)
	})

	return (
		<Layout>
			<SEO 
				title="Membership and subscription box software for small businesses" 
				url="https://why.withfriends.co/organizers"
			/>
			<div className="flex flex-wrap md:flex-nowrap w-full justify-center md:mt-16">
				<div className="flex flex-wrap md:flex-nowrap max-w-screen-md">
					<h1 className="text-center leading-tight">Sell memberships for your local business, automatically</h1>
        </div>
      </div>

			<div className="flex w-full justify-center mt-16">
				<UTMLink
					className="inline-block justify-self-end justify-end"
					href="https://withfriends.co/action/364/sign_up/modal"
					text="Get Started"
				>
					<div className="flex justify-end">
						<Button onClick={becomeAnOrganizer} variant="salmon">Find your members</Button>
					</div>
				</UTMLink>
			</div>
			<div className="flex flex-wrap justify-center md:-mx-8 md:mt-16 text-4xl font-bold text-wfGray-800 py-16 bg-wfGray-100">
				<div className="w-full flex justify-center mb-16">
					<p className="text-center max-w-screen-sm leading-tight">
						An average of <span className="text-salmon-700">one of every five</span> customers
						will support your business, resulting in a
						<span className="text-salmon-700">&nbsp;60%&nbsp;increase</span> in your monthly revenue.
					</p>
				</div>
				<div className="w-full flex justify-center">
					<p className="text-center max-w-screen-sm leading-tight">
						Withfriends helps small businesses earn <span className="text-salmon-700">$11.84m of recurring community support every year.</span>
					</p>
				</div>
			</div>
			{ featureRows }
		</Layout>
	)
}

export const query = graphql`
	query {
		allFeatureRowsYaml {
			edges {
				node {
					id
					title
					content
					image {
						childImageSharp {
							fluid {
								...GatsbyImageSharpFluid
							}
						}
					}
				}
			}
		}
	}
`

export default OrganizersPage

