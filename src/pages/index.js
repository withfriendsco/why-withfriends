import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostTeaser from "../components/PostTeaser"
import RightSidebar from "../components/RightSidebar"

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map(e => e.node)
  return (
    <Layout>
      <SEO title="Membership and subscription software for small businesses" />
      <div className="flex flex-wrap md:flex-nowrap w-full justify-center">
        <div className="flex flex-wrap md:flex-nowrap max-w-screen-2xl">
          <div className="md:pr-8 hidden xl:block xl:mr-8 sm:max-w-xs" />
          <div className="max-w-2xl w-full md:pr-8">
            {posts.slice(0, 1).map(post => (
              <PostTeaser key={post.fields.slug} feature={true} post={post} />
            ))}

            {posts.slice(1, 10).map(post => (
              <PostTeaser key={post.fields.slug} post={post} />
            ))}
          </div>
          <RightSidebar />
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
