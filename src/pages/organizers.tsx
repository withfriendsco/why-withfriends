import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/Button"
import UTMLink from "../components/UTMLink"
import FeatureRow from "../components/FeatureRow"
import { becomeAnOrganizer } from "../helpers/mixpanel"

import Cart from "../components/integrations/Cart"
import Chownow from "../components/integrations/Chownow"
import Discounts from "../components/integrations/Discounts"
import Easy from "../components/integrations/Easy"
import Eventbrite from "../components/integrations/Eventbrite"
import Pos from "../components/integrations/Pos"
import Shopify from "../components/integrations/Shopify"
import Square from "../components/integrations/Square"
import Squarespace from "../components/integrations/Squarespace"
import Tickets from "../components/integrations/Tickets"
import Toast from "../components/integrations/Toast"
import Value from "../components/integrations/Value"

import LocalBusinessVideoMp4 from "../videos/Local_Business.mp4"
import LocalBusinessVideoWebm from "../videos/Local_Business.webm"
import LocalBusinessVideoJpg from "../videos/Local_Business.jpg"

const BecomeAnOrganizer = () => {
	return (
		<div className="flex w-full justify-center">
			<UTMLink
				className="inline-block justify-self-end justify-end"
				href="https://withfriends.co/action/364/sign_up/modal"
				text="Get Started"
			>
				<div className="flex justify-end">
					<Button 
						onClick={becomeAnOrganizer} 
						className="py-6 px-12 text-xl"
						variant="salmon">
						Find your members
					</Button>
				</div>
			</UTMLink>
		</div>
	)
}

const IconItem = ({ icon, text }) => (
	<div className="flex-1 min-w-1/3 my-4 px-2">
		{React.cloneElement(icon, { className: "mx-auto w-8 sm:w-12" })}
		<div className="mt-4 text-sm sm:text-md font-bold">
			{text}
		</div>
	</div>
)

const OrganizersPage = ({ data }) => {
	let imageFirst = false
	const featureRows = data.allFeatureRowsYaml.edges.map(node => {
		imageFirst = !imageFirst
		return (
			<FeatureRow key={node.node.id} imageFirst={imageFirst} featureRow={node.node} />
		)
	})

	const testimonialRows = data.allTestimonialsYaml.edges.map(node => (
		<div className="my-16">
			<div className="prose prose-md sm:prose-xl mb-8 leading-normal text-center sm:text-left">
				{node.node.quote}
			</div>
			<div className="flex">
				<div className="rounded-full mr-8">
					<Img
						className="rounded-full"
						imgStyle={{objectFit: 'contain'}}
						fixed={node.node.image?.childImageSharp.fixed}
						alt={node.node.name}
					/>
				</div>
				<div className="sm:leading-loose text-center sm:text-left">
					<div className="font-bold">
						{node.node.name}
					</div>
					<div>
						{node.node.business}
					</div>
				</div>
			</div>
		</div>
	))

	return (
		<Layout>
			<SEO 
				title="Membership and subscription box software for small businesses" 
				url="https://why.withfriends.co/organizers"
			/>
			<div className="flex flex-wrap md:flex-nowrap w-full justify-center">
				<video autoPlay muted loop playsInline className="absolute top-0 z-0 object-cover w-screen h-screen">
					<source src={LocalBusinessVideoWebm} type="video/webm" />
					<source src={LocalBusinessVideoMp4} type="video/mp4" />
					<img src={LocalBusinessVideoJpg} />
					<p>Your browser does not support the video element.</p>
				</video>
				<div className="absolute flex flex-wrap max-w-screen-md z-10 text-white place-items-center h-screen">
					<div>
						<h1 className="text-center leading-tight mb-16">Sell memberships for your local business, automatically</h1>
						<div className="w-full">
							<BecomeAnOrganizer />
						</div>
					</div>
					<div />
        </div>
      </div>

			<div className="h-screen -mb-32" />

			<div className="flex flex-wrap justify-center px-4 -mx-4 md:-mx-8 text-xl sm:text-2xl md:text-4xl font-bold text-wfGray-800 py-16 bg-wfGray-100">
				<div className="w-full flex justify-center mb-8 md:mb-16">
					<p className="text-center max-w-screen-md leading-tight">
						An average of <span className="text-salmon-700">one of every five</span> customers
						will support your business, resulting in a
						<span className="text-salmon-700">&nbsp;60%&nbsp;increase</span> in your monthly revenue.
					</p>
				</div>
				<div className="w-full flex justify-center">
					<p className="text-center max-w-screen-md leading-tight">
						Withfriends helps small businesses earn <span className="text-salmon-700">$11.84m of recurring community support every year.</span>
					</p>
				</div>
			</div>

			<div className="w-full text-center my-32">Add magic moment here.</div>

			{ featureRows }

			<div className="w-full my-8" />
			<BecomeAnOrganizer />

			<div className="flex flex-wrap justify-center px-6 -mx-6 md:-mx-8 mt-8 md:mt-16 text-wfGray-800 py-8 md:py-16 bg-wfGray-100">
				<div className="text-center w-full max-w-2xl">
					<h3 className="text-2xl md:text-4xl font-normal my-8">
						A sustainable business is one built by its community.
					</h3>
					<div className="flex my-8 flex-wrap">
						<IconItem icon={<Easy />} text="15 minutes to setup" />
						<IconItem icon={<Pos />} text="Point of sale upsell" />
						<IconItem icon={<Cart />} text="Online order upsell" />
						<IconItem icon={<Value />} text="Automated subscriptions" />
						<IconItem icon={<Tickets />} text="Ticketing upsell" />
						<IconItem icon={<Discounts />} text="Automated member discounts" />
					</div>
				</div>
				<div className="w-full sm:my-4" />
				<div className="text-center w-full max-w-2xl">
					<h3 className="text-2xl md:text-4xl font-normal sm:my-8">
						We integrate with your platform, however you reach your customers.
					</h3>
					<div className="flex my-8 flex-wrap">
						<IconItem icon={<Eventbrite />} text="Eventbrite integration" />
						<IconItem icon={<Shopify />} text="Shopify integration" />
						<IconItem icon={<Square />} text="Square integration" />
						<IconItem icon={<Squarespace />} text="Squarespace integration" />
						<IconItem icon={<Toast />} text="Toast integration" />
						<IconItem icon={<Chownow />} text="ChowNow integration" />
					</div>
				</div>
				<div className="w-full sm:my-4" />
				<div className="text-center w-full max-w-2xl">
					<h3 className="text-2xl md:text-4xl font-normal sm:my-8">
						...and more, just ask!
					</h3>
				</div>
				<div className="w-full my-4" />
				<BecomeAnOrganizer />
			</div>

			<div className="flex flex-wrap justify-center md:-mx-8 md:mt-16 text-wfGray-800 py-16">
				<h3 className="text-2xl md:text-4xl text-center font-normal my-8">
					Join over 390 small businesses on Withfriends
				</h3>
				<div className="w-full text-center">Add carousel here.</div>
			</div>
			<div>
				<h3 className="text-2xl md:text-4xl text-center font-normal my-8 text-wfGray-800">
					Stories from Withfriends small businesses
				</h3>
				<div className="max-w-3xl mx-auto">
					<div 
						style={{
							padding:"56.25% 0 0 0", 
							position: "relative"}}>
							<iframe 
								src="https://player.vimeo.com/video/383441579?autoplay=1&muted=1&loop=1&color=ffabac&title=0&byline=0&portrait=0" 
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									width: "100%",
									height: "100%",
								}}
									allow="autoplay; fullscreen"
							></iframe>
					</div>
				</div>
			</div>
			<script src="https://player.vimeo.com/api/player.js"></script>
			<div className="flex justify-center">
				<div className="max-w-2xl">
					{ testimonialRows }
				</div>
			</div>
			<div className="w-full text-center my-32">
				Add testimonials here.
			</div>
			<div className="flex justify-center">
				<div className="max-w-2xl">
					<h3 className="text-2xl md:text-4xl leading-normal text-center mb-8 text-salmon-700 font-bold">Let your community help support your local business.</h3>
					<BecomeAnOrganizer />
				</div>
			</div>
			<div className="flex flex-wrap justify-center px-8 -mx-8 mt-8 md:mt-16 text-wfGray-800 py-16 bg-wfGray-100">
				<div className="max-w-2xl text-center">
					<h3 className="text-2xl md:text-4xl leading-normal text-center mb-8">Have questions?</h3>
					<div className="my-8">
						Get in touch with us via the chat bubble in the bottom-right, or at (646) 846-6126.
					</div>
					<Button variant="outlined">Let's chat</Button>
				</div>
			</div>
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

		allTestimonialsYaml {
			edges {
				node {
					id
					quote
					name
					business
					image {
						childImageSharp {
							fixed(height: 80, cropFocus: ATTENTION) {
								...GatsbyImageSharpFixed
							}
						}
					}
				}
			}
		}
	}
`

export default OrganizersPage

