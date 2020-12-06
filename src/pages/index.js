import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostTeaser from "../components/PostTeaser"
import SignupForm from "../components/SignupForm"
import SidebarAd from "../components/SidebarAd"

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map(e => e.node)
  return (
    <Layout>
      <SEO title="Membership and subscription software for small businesses" />
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
          <SidebarAd />
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
