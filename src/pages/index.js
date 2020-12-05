import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostTeaser from "../components/PostTeaser"
import SignupForm from "../components/SignupForm"

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map(e => e.node)
  return (
    <Layout>
      <SEO title="Words from Withfriends" />
      <div className="w-full flex">
        <div className="flex-grow" />
        <div className="max-w-2xl w-full pr-8">
          {posts.slice(0, 1).map(post => (
            <PostTeaser key={post.slug} feature={true} post={post} />
          ))}

          {posts.slice(1, 10).map(post => (
            <PostTeaser key={post.slug} post={post} />
          ))}
        </div>
        <div className="border-l border-wfGray-300 pl-8">
          <h4 className="mb-4">Get in touch to learn more.</h4>
          <div className="bg-wfGray-600 shadow-lg sm:p-8">
            <SignupForm />
          </div>
          <div className="mt-16" />
          <div className="border-salmon-600 border-2 shadow-lg sm:p-8 prose">
            <h2 className="text-center mb-4">
              Sell memberships for your small business, automatically.
            </h2>
            <p>
              Withfriends makes it easy to sell memberships for any business.
              Whether you run an online e-commerce store, a music venue, or a
              brick-and-mortar bookstore, you can use Withfriends to build
              sustainable recurring revenue for your business or organization.
            </p>{" "}
            <p>
              <a href="https://withfriends.co/organizers">Learn more</a>.
            </p>
            <h3 className="text-center mb-4">
              Curious who else uses Withfriends?
            </h3>
            <p>
              We've got everyone from&nbsp;
              <a
                href="https://withfriends.co/elsewhere?utm_medium=referral&utm_content=music%20venues"
                rel="noreferrer"
                target="_blank"
              >
                music venues
              </a>
              , to&nbsp;
              <a
                href="https://withfriends.co/dimos_pizza?utm_medium=referral&utm_content=restaurants"
                rel="noreferrer"
                target="_blank"
              >
                restaurants
              </a>
              , to&nbsp;
              <a
                href="https://withfriends.co/stick_figure?utm_medium=referral&utm_content=bands%20selling%20merch%20direct%20to%20fans"
                rel="noreferrer"
                target="_blank"
              >
                bands selling merch direct to fans
              </a>
              , to&nbsp;
              <a
                href="https://withfriends.co/cabrire_farm?utm_medium=referral&utm_content=farm%20to%20table%20produce%20operations"
                rel="noreferrer"
                target="_blank"
              >
                farm-to-table produce operations
              </a>{" "}
              on Withfriends.
            </p>{" "}
            <p>
              <a
                href="https://withfriends.co/meet_our_organizations?utm_medium=referral&utm_content=Check%out%all%our%organizers"
                rel="noreferrer"
                target="_blank"
              >
                Check out all our organizers
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: 4
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          html
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            author
            headerImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt(format: HTML)
          timeToRead
        }
      }
    }
  }
`

export default IndexPage
